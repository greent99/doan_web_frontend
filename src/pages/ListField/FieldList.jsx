import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Col,
  Row,
  Dropdown,
  InputGroup,
  FormControl,
  Table,
  FormCheck,
} from 'react-bootstrap';
import {
  BsSearch,
  BsFunnelFill,
  BsPencil,
  BsXCircle,
  BsFillCaretUpFill,
  BsFillCaretDownFill,
} from 'react-icons/bs';
import './fieldList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import jwPaginate from 'jw-paginate';
import Detailed from './DetailField';
import { getAllField, removeStoreField, setHeaderTitle, deleteField } from '../../actions';
import { userTypes, fieldTabHeader, createToast, enumUserTypes, isObjectEmpty } from '../../utils';
import { Paginator } from '../../components/Paginator';

const ListUsers = () => {
  const [show, setShow] = useState(false);
  const [userType, setUserType] = useState(enumUserTypes.ALL);
  const dispatch = useDispatch();
  const { loading, error, fields, currentPage, totalItems, totalPages } = useSelector(
    (state) => state.getAllFieldReducer
  );
  const { success } = useSelector((state) => state.deleteFieldReducer);
  const { userData } = useSelector((state) => state.authReducer);
  const [searchText, setSearchText] = useState('');
  const [condition, setCondition] = useState({});
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: 'username',
    variation: 'ASC',
  });
  useEffect(() => {
    dispatch(setHeaderTitle(['Manage Field']));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllField());
  }, [dispatch, success]);

  useEffect(() => {
    dispatch(getAllField({ ...condition, ...sortCriteria }));
    if (
      searchText ||
      sortCriteria.sortBy !== 'name' ||
      sortCriteria.variation !== 'ASC' ||
      !isObjectEmpty(condition)
    ) {
      dispatch(removeStoreField());
    }
  }, [condition, dispatch, sortCriteria]);

  useEffect(() => {
    if (!loading && error) {
      createToast(error, 'error');
    }
  }, [loading, error]);

  const onChangeSortCriteria = (sortBy) => {
    setSearchText('');
    if (sortCriteria.sortBy === sortBy) {
      return setSortCriteria({
        sortBy,
        variation: sortCriteria.variation === 'ASC' ? 'DESC' : 'ASC',
      });
    }
    return setSortCriteria({
      sortBy,
      variation: 'ASC',
    });
  };
  const handlePageChange = (pageNumber) => setCondition({ ...condition, page: pageNumber - 1 });

  const renderTableHeaders = () =>
    fieldTabHeader.map((tableHeader) => {
      // If current sort by column === table header
      // then it will check whether it sorts order by ASC or DESC

      // The class active is for highlighting
      if (sortCriteria.sortBy === tableHeader.sortBy) {
        return (
          <th
            className="sort-table-header active"
            onClick={() => onChangeSortCriteria(tableHeader.sortBy)}
          >
            {tableHeader.name}

            {/* If this is ASC we display a caret up, else we display a caret down */}
            {sortCriteria.variation === 'ASC' ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
          </th>
        );
      }

      // Render a normal non-highlighting table header
      return (
        <th className="sort-table-header" onClick={() => onChangeSortCriteria(tableHeader.sortBy)}>
          {tableHeader.name}
          <BsFillCaretUpFill />
        </th>
      );
    });
  const renderUserList = () => {
    if (loading) {
      return <h2>Loading...</h2>;
    }
    if (error) {
      return <h2>{error}</h2>;
    }
    if (!loading && fields.length === 0) {
      return <h2>There is no data</h2>;
    }
    const fieldList = fields.filter((item) => item.id !== userData.user.id);
    // if (newUser) {
    //   userList = [newUser, ...users.filter((item) => item.id !== newUser.id)];
    // }
    return (
      <tbody>
        {fieldList.map((field) => (
          <tr className="row-data" key={field.id}>
            <Popup modal trigger={<td className="popup-button">{field.id}</td>}>
              <Detailed isShowed currentUser={field} />
            </Popup>
            <Popup modal trigger={<td className="popup-button">{field.name}</td>}>
              <Detailed isShowed currentUser={field} />
            </Popup>
            <td>{field.category_name}</td>
            <td className="edit-delete">
              <Link to={`/fields/edit/${field.id}`} className="btn btn-light ">
                <BsPencil className="edit-icon" />
              </Link>
              <Button
                onClick={() => {
                  dispatch(deleteField(field.id));
                }}
                variant="light"
                className="ml-2"
              >
                <BsXCircle className="delete-icon" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };
  const searchInput = useRef(null);
  const handleChangeSearch = () => {
    setSearchText(searchInput.current.value);
    // console.log(searchText);
  };
  const renderSearchBar = () => (
    <InputGroup>
      <FormControl
        placeholder="Search"
        value={searchText}
        ref={searchInput}
        onChange={handleChangeSearch}
      />

      <Button
        variant="secondary"
        onClick={() => {
          setCondition({
            ...condition,
            searchText,
          });
        }}
      >
        <BsSearch />
      </Button>
    </InputGroup>
  );

  const renderCheckBoxItems = () =>
    userTypes.map((checkBoxItem) => (
      <div
        className="dropdown-item"
        onKeyDown={checkBoxItem}
        role="button"
        tabIndex="0"
        onClick={() => {
          setSearchText('');
          setUserType(checkBoxItem);
          setCondition({
            type: checkBoxItem,
          });
        }}
      >
        <FormCheck label={checkBoxItem} checked={userType === checkBoxItem} value={checkBoxItem} />
      </div>
    ));

  return (
    <div id="user-list-table">
      <Row>
        <h3>User List</h3>
      </Row>
      <Row>
        <Col md="3">
          <div className="input-with-dropdown">
            <Dropdown show={show}>
              <InputGroup className="mb-3">
                <FormControl placeholder="Type" value={userType} disabled />
                <Dropdown.Toggle
                  onClick={() => setShow(!show)}
                  id="dropdown-basic"
                  variant="danger"
                  drop="down"
                >
                  <BsFunnelFill />
                </Dropdown.Toggle>

                <Dropdown.Menu>{renderCheckBoxItems()}</Dropdown.Menu>
              </InputGroup>
            </Dropdown>
          </div>
        </Col>
        <Col md="4" className="offset-md-2">
          {renderSearchBar()}
        </Col>
        <Col md="3">
          <Link to="/fields/create" className="btn btn-primary btn-block">
            Create new field
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md="12" className="table-user-list">
          <Table responsive>
            <thead>
              <tr>{renderTableHeaders()}</tr>
            </thead>
            {renderUserList()}
          </Table>
        </Col>
      </Row>

      <Paginator
        pageObject={jwPaginate(totalItems, currentPage + 1, 10, totalPages)}
        onChangePageNumber={handlePageChange}
        toTop
      />
    </div>
  );
};

export default ListUsers;
