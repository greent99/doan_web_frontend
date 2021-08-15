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
  BsFillCaretUpFill,
  BsFillCaretDownFill,
} from 'react-icons/bs';
import './userList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import jwPaginate from 'jw-paginate';
import Detailed from './DetailUser';
import { removeStoreCourse, setHeaderTitle, getAllCourse } from '../../actions';
import {
  userTypes,
  courseTableHeader,
  createToast,
  enumUserTypes,
  isObjectEmpty,
} from '../../utils';
import { Paginator } from '../../components/Paginator';

const ListCourses = () => {
  const [show, setShow] = useState(false);
  const [userType, setUserType] = useState(enumUserTypes.ALL);
  const dispatch = useDispatch();
  const { loading, error, courses, currentPage, totalItems, totalPages } = useSelector(
    (state) => state.getAllCourseReducer
  );
  const { deleteSuccess } = useSelector((state) => state.deleteUserReducer);
  const { userData } = useSelector((state) => state.authReducer);
  const [searchText, setSearchText] = useState('');
  const [condition, setCondition] = useState({});
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: 'username',
    variation: 'ASC',
  });
  useEffect(() => {
    dispatch(setHeaderTitle(['Manage Course']));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllCourse());
  }, [dispatch, deleteSuccess]);

  useEffect(() => {
    dispatch(getAllCourse({ ...condition, ...sortCriteria }));
    if (
      searchText ||
      sortCriteria.sortBy !== 'firstName' ||
      sortCriteria.variation !== 'ASC' ||
      !isObjectEmpty(condition)
    ) {
      dispatch(removeStoreCourse());
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
    courseTableHeader.map((tableHeader) => {
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
    if (!loading && courses.length === 0) {
      return <h2>There is no data</h2>;
    }
    const userList = courses.filter((item) => item.id !== userData.user.id);
    // if (newUser) {
    //   userList = [newUser, ...users.filter((item) => item.id !== newUser.id)];
    // }
    return (
      <tbody>
        {userList.map((course) => (
          <tr className="row-data" key={course.id}>
            <Popup modal trigger={<td className="popup-button">{course.name}</td>}>
              <Detailed isShowed currentUser={course} />
            </Popup>
            <td>{course.author_name}</td>
            <td>{course.field_name}</td>
            <td>{course.price}</td>
            <td>{course.statuscode}</td>
            <td className="edit-delete">
              <Link to={`/courses/edit/${course.id}`} className="btn btn-light ">
                <BsPencil className="edit-icon" />
              </Link>
              {/* <Button
                onClick={() => {
                  dispatch(deleteUser(course.id));
                }}
                variant="light"
                className="ml-2"
              >
                <BsXCircle className="delete-icon" />
              </Button> */}
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
        <h3>Course List</h3>
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
          <Link to="/courses/create" className="btn btn-primary btn-block">
            Create new course
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

export default ListCourses;
