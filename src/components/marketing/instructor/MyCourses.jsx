import React, { useMemo, Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash, Edit, MoreVertical } from 'react-feather';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Card,
  Row,
  Col,
  Dropdown,
  Image,
  Badge,
  Table,
  ListGroup,
  ProgressBar
} from 'react-bootstrap';

import GlobalFilter from 'components/elements/advance-table/GlobalFilter';
import Pagination from 'components/elements/advance-table/Pagination';
import ProfileLayout from './ProfileLayout';

const MyCourses = () => {
  const [filtering, setFiltering] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/cursos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCoursesData(data);
		console.log(data); // Esto te ayudará a ver qué estás recibiendo exactamente
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };

    fetchCourses();
  }, []);

  const columns = useMemo(() => [
    {
      accessorKey: 'title',
      header: () => 'Titulo',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'level',
      header: () => 'Nivel',
      cell: info =>  info.getValue(),
    },
    {
      accessorKey: 'image',
      header: () => 'Imagen',
      cell: info => (
        <Image src={info.getValue()} alt="course" className="rounded img-4by3-lg" />
      ),
    },
    {
      accessorKey: 'status',
      header: () => 'Status',
      cell: info => (
        <Badge bg={info.getValue() === 'Active' ? 'success' : 'warning'}>
          {info.getValue()}
        </Badge>
      ),
    },
  ], []);

  const table = useReactTable({
    data: coursesData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: filtering,
      rowSelection,
    },
    onGlobalFilterChange: setFiltering,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <ProfileLayout>
      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Mis cursos</h3>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col lg={9} md={7} sm={12} className="mb-lg-0 mb-2">
              <GlobalFilter
                filtering={filtering}
                setFiltering={setFiltering}
                placeholder="Buscar cursos"
              />
            </Col>
          </Row>
        </Card.Body>
        <Card.Body className="p-0 pb-5">
          <Table hover responsive className="text-nowrap table-centered">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination table={table} />
        </Card.Body>
      </Card>
    </ProfileLayout>
  );
};

export default MyCourses;
