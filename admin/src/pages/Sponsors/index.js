import React, { useState } from "react";
import {
  Table,
  makeStyles,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
} from "@material-ui/core";
import { Route, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import { AuthGuard } from "../../shared";
import Sponsor from "./Sponsor";

const rows = [
  // {
  //   id: 'efaefaefae',
  //   country: 'Bangladesh',
  //   user: 'arifullah_0',
  //   post: 'post_id',
  //   date: '24 Sep',
  //   views: 120,
  //   budget: 100,
  //   expire: '30 Sep',
  //   status: 'pending',
  // },
  // {
  //   id: 'efaesacfaefae',
  //   country: 'United States',
  //   user: 'fahad_0',
  //   post: 'post_id',
  //   date: '24 Sep',
  //   views: 120,
  //   budget: 100,
  //   expire: '30 Sep',
  //   status: 'active',
  // },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "country", numeric: false, label: "Country" },
  { id: "user", numeric: false, label: "User" },
  { id: "post", numeric: false, label: "Post ID" },
  { id: "date", numeric: true, label: "Date" },
  { id: "views", numeric: true, label: "Views" },
  { id: "budget", numeric: true, label: "Budget" },
  { id: "expire", numeric: false, label: "Expire" },
  { id: "status", numeric: false, label: "Status" },
];

const useStyles = makeStyles(() => ({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const classes = useStyles();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            style={{ fontWeight: 700 }}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function Sponsors({ match: { url }, history: { push } }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const classes = useStyles();
  return (
    <div></div>
    // <div>
    //   <Paper>
    //     <TableContainer>
    //       <Table size="medium">
    //         <EnhancedTableHead
    //           order={order}
    //           orderBy={orderBy}
    //           onRequestSort={handleRequestSort}
    //           rowCount={rows.length}
    //         />

    //         {/* Grid view */}

    //         {/* <Grid container spacing={3}>
    //           <Grid item xs={3}>
    //             <Paper className={classes.paper}>xs=3</Paper>
    //           </Grid>
    //           <Grid item xs={3}>
    //             <Paper className={classes.paper}>xs=3</Paper>
    //           </Grid>
    //           <Grid item xs={3}>
    //             <Paper className={classes.paper}>xs=3</Paper>
    //           </Grid>
    //           <Grid item xs={3}>
    //             <Paper className={classes.paper}>xs=3</Paper>
    //           </Grid>
    //         </Grid> */}
    //         {/* Grid view */}

    //         {/* ** code done by older developer ** */}
    //         {/* <TableBody>
    //           {stableSort(rows, getComparator(order, orderBy))
    //             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //             .map(
    //               ({
    //                 id,
    //                 country,
    //                 user,
    //                 post,
    //                 date,
    //                 views,
    //                 budget,
    //                 expire,
    //                 status,
    //               }) => (
    //                 <TableRow hover tabIndex={-1} key={id}>
    //                   <TableCell>country</TableCell>
    //                   <TableCell>{user}</TableCell>
    //                   <TableCell>{post.substr(0, 8)}...</TableCell>
    //                   <TableCell>{views}/250</TableCell>
    //                   <TableCell>{budget}</TableCell>
    //                   <TableCell>{date}</TableCell>
    //                   <TableCell>{expire}</TableCell>
    //                   <TableCell
    //                     onClick={() => push(`${url}/${id}`)}
    //                     style={{
    //                       textDecoration: "underline",
    //                       color: "#b910b9",
    //                       textTransform: "uppercase",
    //                       cursor: "pointer",
    //                     }}
    //                   >
    //                     {status}
    //                   </TableCell>
    //                 </TableRow>
    //               )
    //             )}
    //           {emptyRows > 0 && (
    //             <TableRow style={{ height: 53 * emptyRows }}>
    //               <TableCell colSpan={6} />
    //             </TableRow>
    //           )}
    //         </TableBody> */}
    //       </Table>
    //     </TableContainer>
    //     {/* <TablePagination
    //       component="div"
    //       count={rows.length}
    //       rowsPerPage={rowsPerPage}
    //       page={page}
    //       onChangePage={handleChangePage}
    //     /> */}
    //   </Paper>
    //   <Route path={`${url}/:sponsorid`}>
    //     <Sponsor />
    //   </Route>
    // </div>
  );
}

export default withRouter(AuthGuard(Sponsors));
