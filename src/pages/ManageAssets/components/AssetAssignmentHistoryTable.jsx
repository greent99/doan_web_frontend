import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

const AssetAssignmentHistoryTable = () => {
  // TODO: make the data become dynamic when feature #13, #16, #21, #23 are added.
  const [assignmentList] = useState([
    {
      id: 1,
      date: '12/10/2018',
      assignedTo: 'hungtv1',
      assignedBy: 'binhnv',
      returnedDate: '07/03/2019',
    },
    {
      id: 2,
      date: '10/03/2019',
      assignedTo: 'thinhptx',
      assignedBy: 'tuanha',
      returnedDate: '22/03/2020',
    },
  ]);

  const renderAssignmentItems = () =>
    assignmentList.map((assignmentItem) => (
      <tr key={assignmentItem.id}>
        <td>{assignmentItem.date}</td>
        <td>{assignmentItem.assignedTo}</td>
        <td>{assignmentItem.assignedBy}</td>
        <td>{assignmentItem.returnedDate}</td>
      </tr>
    ));

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Date</th>
          <th>Assigned To</th>
          <th>Assigned By</th>
          <th>Returned Date</th>
        </tr>
      </thead>
      <tbody>{renderAssignmentItems()}</tbody>
    </Table>
  );
};

export default AssetAssignmentHistoryTable;
