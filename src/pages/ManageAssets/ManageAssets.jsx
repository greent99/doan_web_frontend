import React, { useState, useEffect, useRef } from 'react';
import { Button, Row, Col, InputGroup, FormControl, Table } from 'react-bootstrap';
import { BsSearch, BsPencil, BsXCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { findAssets, removeStoreAsset } from '../../actions';
import { generateFindAssetsURL } from '../../utils';
import { AssetDetailsModal, StateDropdown, CategoryDropdown, AssetTableView } from './components';
import { Paginator } from '../../components/Paginator';
import './manageAssets.scss';

const ManageAssets = () => {
  const dispatch = useDispatch();

  const {
    loading: assetLoading,
    error: assetError,
    assets,
    assetPageObject,
  } = useSelector((state) => state.findAssetsReducer);

  const { asset } = useSelector((state) => state.storeAssetReducer);

  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAssetDetails, setSelectedAssetDetails] = useState(null);
  const [selectedStateList, setSelectedStateList] = useState([
    'Available',
    'Assigned',
    'Not Available',
  ]);
  const [selectedCategoryList, setSelectedCategoryList] = useState([0]);
  const [searchText, setSearchText] = useState('');
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: 'assetName',
    order: 'ASC',
  });

  const searchInput = useRef(null);

  useEffect(() => {
    if (
      selectedStateList.length !== 3 ||
      sortCriteria.sortBy !== 'assetName' ||
      sortCriteria.order !== 'ASC'
    ) {
      dispatch(removeStoreAsset());
    }
    const findAssetURL = generateFindAssetsURL(
      selectedCategoryList,
      selectedStateList,
      searchText,
      sortCriteria,
      currentPage
    );
    dispatch(findAssets(findAssetURL));
  }, [selectedCategoryList, selectedStateList, searchText, sortCriteria, currentPage]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangePageNumber = (page) => {
    setCurrentPage(page);
  };

  const onChangeStateList = (stateName) => {
    setCurrentPage(1);

    if (stateName === 'All') {
      return setSelectedStateList(['All']);
    }

    if (selectedStateList.includes(stateName)) {
      const filteredList = selectedStateList.filter(
        (selectedStateItem) => selectedStateItem !== stateName
      );
      if (filteredList.length === 0) {
        return setSelectedStateList(['All']);
      }
      return setSelectedStateList(filteredList);
    }

    return setSelectedStateList([
      ...selectedStateList.filter((selectedStateItem) => selectedStateItem !== 'All'),
      stateName,
    ]);
  };

  const onChangeSortCriteria = (sortBy) => {
    setCurrentPage(1);

    if (sortCriteria.sortBy === sortBy) {
      return setSortCriteria({
        ...sortCriteria,
        sortBy,
        order: sortCriteria.order === 'ASC' ? 'DESC' : 'ASC',
      });
    }

    return setSortCriteria({
      ...sortCriteria,
      sortBy,
      order: 'ASC',
    });
  };

  const onChangeCategoryList = (categoryID) => {
    setCurrentPage(1);

    if (categoryID === 0) {
      return setSelectedCategoryList([0]);
    }

    if (selectedCategoryList.includes(categoryID)) {
      const filteredList = selectedCategoryList.filter(
        (selectedCategoryItem) => selectedCategoryItem !== categoryID
      );
      if (filteredList.length === 0) {
        return setSelectedCategoryList([0]);
      }
      return setSelectedCategoryList(filteredList);
    }

    return setSelectedCategoryList([
      ...selectedCategoryList.filter((selectedCategoryItem) => selectedCategoryItem !== 0),
      categoryID,
    ]);
  };

  const renderSearchBar = () => (
    <InputGroup className="mb-3">
      <FormControl placeholder="Search" ref={searchInput} />

      <Button
        variant="secondary"
        onClick={() => {
          setSearchText(searchInput.current.value);
        }}
      >
        <BsSearch />
      </Button>
    </InputGroup>
  );

  const renderAssetTableView = () => {
    if (assetLoading) {
      return <h2>Loading...</h2>;
    }

    if (!assetLoading) {
      if (assetError) {
        return <h2>{assetError}</h2>;
      }

      let assetList = assets;

      if (asset) {
        assetList = [asset, ...assets.filter((assetItem) => assetItem.id !== asset.id)];
      }

      return assetList.map((assetItem) => (
        <tr className="row-data">
          <td
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleShow();
              setSelectedAssetDetails(assetItem);
            }}
            role="presentation"
          >
            {assetItem.assetCode}
          </td>
          <td
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleShow();
              setSelectedAssetDetails(assetItem);
            }}
            role="presentation"
          >
            {assetItem.assetName}
          </td>
          <td onClick={handleShow} role="presentation">
            {assetItem.Category.categoryName}
          </td>
          <td onClick={handleShow} role="presentation">
            {assetItem.state}
          </td>
          <td className="text-center">
            <Link to={`/assets/edit/${assetItem.id}`} className="btn btn-light">
              <BsPencil style={{ color: 'black', cursor: 'pointer' }} />
            </Link>
          </td>
          <td className="text-center">
            <Button variant="light">
              <BsXCircle style={{ color: 'red', cursor: 'pointer' }} />
            </Button>
          </td>
        </tr>
      ));
    }

    return [];
  };

  return (
    <div id="manage-asset-page">
      <Row>
        <Col sm="3">
          <StateDropdown
            selectedStateList={selectedStateList}
            onChangeStateList={onChangeStateList}
          />
        </Col>
        <Col sm="3">
          <CategoryDropdown
            onChangeCategoryList={onChangeCategoryList}
            selectedCategoryList={selectedCategoryList}
          />
        </Col>
        <Col sm="3">{renderSearchBar()}</Col>
        <Col sm="3">
          <Link to="/assets/create" className="btn btn-primary btn-block">
            Create New Asset
          </Link>
        </Col>
      </Row>
      {assets.length === 0 ? (
        <h2>There is no record</h2>
      ) : (
        <Table responsive className="table-asset-list">
          <AssetTableView sortCriteria={sortCriteria} onChangeSortCriteria={onChangeSortCriteria} />
          <tbody>{renderAssetTableView()}</tbody>
        </Table>
      )}

      <Paginator pageObject={assetPageObject} onChangePageNumber={onChangePageNumber} toTop />

      <AssetDetailsModal
        selectedAssetDetails={selectedAssetDetails}
        handleClose={handleClose}
        isShowed={show}
      />
    </div>
  );
};

export default ManageAssets;
