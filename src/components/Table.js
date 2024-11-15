import { useRef, useEffect, forwardRef, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import {
    useTable,
    useSortBy,
    usePagination,
    useRowSelect,
    useGlobalFilter,
    useAsyncDebounce,
    useExpanded,
} from 'react-table';
import classNames from 'classnames';

// components
import Pagination from './Pagination';
import { sizePerPageList } from '../utils/constData';
import FormLayout from '../utils/formLayout';

// Define a default UI for filtering
const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, searchBoxClass }) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div className={classNames(searchBoxClass)}>
            <span className="d-flex align-items-center">
                {/* Search :{' '} */}
                <input
                    type="search"
                    value={value || ''}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`Search..`}
                    className="form-control w-auto ms-1 mr-1"
                />
            </span>
        </div>
    );
};

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" ref={resolvedRef} {...rest} />
                <label htmlFor="form-check-input" className="form-check-label"></label>
            </div>
        </>
    );
});

const Table = (props) => {
    const isSearchable = props['isSearchable'] || true;
    const filterTbl = props['filterTbl'] || false;
    const footerTbl = props['footerTbl'] || false;
    const isSortable = props['isSortable'] || true;
    const pagination = props['pagination'] === undefined ? true : false;
    const isSelectable = props['isSelectable'] || false;
    const isExpandable = props['isExpandable'] || false;
    const sizePerPageListData = sizePerPageList
    const columnData = props['columns']
    const columnLength = columnData.length || 4
    const { toggle = null, addBtn = true, onClickCallBack = {}, defaultState = [], tableIcon = false, footerTable = false, btnName = false, Title, filterFormContainer, optionListState, filterSubmitFunction, onChangeCallBack, state, setState, filterColNo, footerLabel } = props;

    let otherProps = {};

    if (isSearchable) {
        otherProps['useGlobalFilter'] = useGlobalFilter;
    }
    if (isSortable) {
        otherProps['useSortBy'] = useSortBy;
    }
    if (isExpandable) {
        otherProps['useExpanded'] = useExpanded;
    }
    if (pagination) {
        otherProps['usePagination'] = usePagination;
    }
    if (isSelectable) {
        otherProps['useRowSelect'] = useRowSelect;
    }



    const dataTable = useTable(
        {
            columns: props['columns'],
            data: props['data'],
            initialState: { pageSize: props['pageSize'] || 10 },
        },
        otherProps.hasOwnProperty('useGlobalFilter') && otherProps['useGlobalFilter'],
        otherProps.hasOwnProperty('useSortBy') && otherProps['useSortBy'],
        otherProps.hasOwnProperty('useExpanded') && otherProps['useExpanded'],
        otherProps.hasOwnProperty('usePagination') && otherProps['usePagination'],
        otherProps.hasOwnProperty('useRowSelect') && otherProps['useRowSelect'],
        (hooks) => {
            isSelectable &&
                hooks.visibleColumns.push((columns) => [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllPageRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                            </div>
                        ),
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]);

            isExpandable &&
                hooks.visibleColumns.push((columns) => [
                    {
                        id: 'expander',
                        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                            <span {...getToggleAllRowsExpandedProps()}>{isAllRowsExpanded ? '-' : '+'}</span>
                        ),
                        Cell: ({ row }) =>
                            row.canExpand ? (
                                <span
                                    {...row.getToggleRowExpandedProps({
                                        style: {
                                            paddingLeft: `${row.depth * 2}rem`,
                                        },
                                    })}>
                                    {row.isExpanded ? '-' : '+'}
                                </span>
                            ) : null,
                    },
                    ...columns,
                ]);
        }
    );

    let rows = pagination ? dataTable.page : dataTable.rows;

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col xs={12}>
                                    <Card>
                                        <Row>
                                            <Col md={4}>
                                                <h4 style={{ lineHeight: '100%' }}>
                                                    {' '}
                                                    {Title}
                                                </h4>
                                            </Col>
                                            <Col md={8} xs={12} className="d-flex justify-content-end">
                                                <Row>
                                                    <Col xs={6} >
                                                        {isSearchable && (
                                                            <GlobalFilter
                                                                preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
                                                                globalFilter={dataTable.state.globalFilter}
                                                                setGlobalFilter={dataTable.setGlobalFilter}
                                                                searchBoxClass={props['searchBoxClass']}
                                                            />
                                                        )}
                                                    </Col>
                                                    <Col xs={6} className="d-flex justify-content-end">
                                                        {
                                                            toggle && addBtn ? <Button
                                                                variant="success"
                                                                className="waves-effect waves-light"
                                                                onClick={toggle}>
                                                                <i className={`mdi ${tableIcon ? tableIcon : "mdi-plus-circle"} `}></i>
                                                                {btnName ? btnName : "Add"}
                                                            </Button> : ""
                                                        }
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col className="mt-3">
                                                {
                                                    filterTbl && <FormLayout
                                                        dynamicForm={filterFormContainer}
                                                        optionListState={optionListState}
                                                        handleSubmit={filterSubmitFunction}
                                                        onChangeCallBack={onChangeCallBack}
                                                        setState={setState}
                                                        state={state}
                                                        noOfColumns={filterColNo}
                                                        onClickCallBack={onClickCallBack}
                                                    />
                                                }
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>

                            <div className="table-responsive">
                                <table
                                    {...dataTable.getTableProps()}
                                    className={classNames('table table-centered react-table', props['tableClass'])}>
                                    <thead className={props['theadClass']}>
                                        {(dataTable.headerGroups || []).map((headerGroup) => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {(headerGroup.headers || []).map((column) => (
                                                    <th
                                                        {...column.getHeaderProps(
                                                            column.sort && column.getSortByToggleProps()
                                                        )}
                                                        className={classNames({
                                                            sorting_desc: column.isSortedDesc === true,
                                                            sorting_asc: column.isSortedDesc === false,
                                                            sortable: column.sort === true,
                                                        })}
                                                        style={{ whiteSpace: "nowrap" }}
                                                    >
                                                        {column.render('Header')}
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody {...dataTable.getTableBodyProps()}>
                                        {rows.length <= 0 ? (
                                            <tr style={{ height: '100%' }}><td colSpan={columnLength} className='text-center text-muted' style={{ letterSpacing: '0.2em' }}><b>Empty...!</b></td></tr>
                                        )
                                            : (rows || []).map((row, i) => {
                                                dataTable.prepareRow(row);
                                                return (
                                                    <tr {...row.getRowProps()}>
                                                        {(row.cells || []).map((cell) => {
                                                            return (
                                                                <td
                                                                    {...cell.getCellProps([
                                                                        {
                                                                            className: cell.column.className,
                                                                        },
                                                                    ])}
                                                                    className="cursor-pointer text-nowrap">
                                                                    {cell.render('Cell')}
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                    {
                                        footerTbl &&
                                        <tfoot>
                                            <tr>
                                                {dataTable.footerGroups[0].headers.map((column) => (
                                                    <td {...column.getFooterProps()}>
                                                        {column.render('Footer')}
                                                    </td>
                                                ))}
                                            </tr>
                                        </tfoot>
                                    }
                                </table>
                            </div>

                            {pagination === true && <Pagination tableProps={dataTable} sizePerPageList={sizePerPageListData} />}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Table;
