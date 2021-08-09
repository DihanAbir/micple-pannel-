import React, { useState, useEffect } from "react";
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
import "./styles.scss";
import { dummydata } from "./Sponsor/Data";
import Rejection from "./Sponsor/Rejection";
import Success from "./Sponsor/success";
import Timer from "../../shared/Timeer/Timer";

// const rows = [
//   // {
//   //   id: 'efaefaefae',
//   //   country: 'Bangladesh',
//   //   user: 'arifullah_0',
//   //   post: 'post_id',
//   //   date: '24 Sep',
//   //   views: 120,
//   //   budget: 100,
//   //   expire: '30 Sep',
//   //   status: 'pending',
//   // },
//   // {
//   //   id: 'efaesacfaefae',
//   //   country: 'United States',
//   //   user: 'fahad_0',
//   //   post: 'post_id',
//   //   date: '24 Sep',
//   //   views: 120,
//   //   budget: 100,
//   //   expire: '30 Sep',
//   //   status: 'active',
//   // },
// ];

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//   { id: "country", numeric: false, label: "Country" },
//   { id: "user", numeric: false, label: "User" },
//   { id: "post", numeric: false, label: "Post ID" },
//   { id: "date", numeric: true, label: "Date" },
//   { id: "views", numeric: true, label: "Views" },
//   { id: "budget", numeric: true, label: "Budget" },
//   { id: "expire", numeric: false, label: "Expire" },
//   { id: "status", numeric: false, label: "Status" },
// ];

// const useStyles = makeStyles(() => ({
//   visuallyHidden: {
//     border: 0,
//     clip: "rect(0 0 0 0)",
//     height: 1,
//     margin: -1,
//     overflow: "hidden",
//     padding: 0,
//     position: "absolute",
//     top: 20,
//     width: 1,
//   },
// }));

// function EnhancedTableHead({ order, orderBy, onRequestSort }) {
//   const classes = useStyles();
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };
//   return (
//     <TableHead>
//       <TableRow>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             style={{ fontWeight: 700 }}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <span className={classes.visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </span>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const rows = dummydata;

function Sponsors({ match: { url }, history: { push } }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {}, [selectedPost, selectedItem, selectedUser]);

  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: "83vh",
    },
    visible: {
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
  });
  const classes = useStyles();

  return (
    <div className="adstable">
      <div className="displaySpace">
        <div className="filter displaySpace">
          <h2 style={{ marginRight: "100px" }}>Filter Items:</h2>
          <div>
            Approve <Success />
          </div>
          <div>
            Reject <Success />
          </div>
          <div>
            Unseen <Success />
          </div>
        </div>
        <div>
          <Timer />
        </div>
      </div>
      <div className="adsData">
        <div className="Header">
          <Grid container>
            <Grid
              style={{
                borderRight: "1px solid #7a8dea",
                color: " black",
                padding: "10px",
                fontWeight: 700,
                fontSize: "14px",
                backgroundColor: "#d6d8fd",
              }}
              item
              xs={1}
            >
              Country
            </Grid>
            <Grid
              style={{
                borderRight: "1px solid #7a8dea",
                color: " black",
                padding: "10px",
                fontWeight: 700,
                fontSize: "14px",
                backgroundColor: "#d6d8fd",
              }}
              item
              xs={2}
            >
              User ID
            </Grid>
            <Grid
              style={{
                borderRight: "1px solid #7a8dea",
                color: " black",
                padding: "10px",
                fontWeight: 700,
                fontSize: "14px",
                backgroundColor: "#d6d8fd",
              }}
              item
              xs={3}
            >
              Post ID
            </Grid>
            <Grid
              style={{
                borderRight: "1px solid #7a8dea",
                color: " black",
                padding: "10px",
                fontWeight: 700,
                fontSize: "14px",
                backgroundColor: "#d6d8fd",
              }}
              item
              xs={1}
            >
              Date
            </Grid>
            <Grid
              style={{
                borderRight: "1px solid #7a8dea",
                color: " black",
                padding: "10px",
                fontWeight: 700,
                fontSize: "14px",
                backgroundColor: "#d6d8fd",
              }}
              item
              xs={1}
            >
              View
            </Grid>
            <Grid
              style={{
                borderRight: "1px solid #7a8dea",
                color: " black",
                padding: "10px",
                fontWeight: 700,
                fontSize: "14px",
                backgroundColor: "#d6d8fd",
              }}
              item
              xs={1}
            >
              Budget
            </Grid>
            <Grid
              style={{
                borderRight: "1px solid #7a8dea",
                color: " black",
                padding: "10px",
                fontWeight: 700,
                fontSize: "14px",
                backgroundColor: "#d6d8fd",
              }}
              item
              xs={1}
            >
              Expire
            </Grid>
            <Grid
              style={{
                borderRight: "1px solid #7a8dea",
                color: " black",
                padding: "10px",
                fontWeight: 700,
                fontSize: "14px",
                backgroundColor: "#d6d8fd",
              }}
              item
              xs={2}
            >
              Status
            </Grid>
          </Grid>
        </div>

        <Grid container>
          <Grid
            style={{
              height: "80vh",
              overflow: "scroll",
            }}
            item
            xs={1}
          >
            {rows.map((row) => (
              <p
                onClick={() => setSelectedItem(row.CountryName)}
                style={{
                  boxShadow: "inset -4px -2px 17px -6px rgba(204,205,234,0.52)",
                  color: "black",
                  padding: "10px",
                  margin: "4px",
                  fontSize: "12px",
                  backgroundColor:
                    selectedItem === row.CountryName
                      ? "rgb(167, 190, 255)"
                      : "white",
                }}
              >
                {row.CountryName}({Math.floor(Math.random() * 10) + 1})
              </p>
            ))}
          </Grid>
          {/* 2nd item */}
          {selectedItem === null ? (
            ""
          ) : (
            <Grid
              style={{
                height: "80vh",
                overflow: "scroll",
                //
              }}
              item
              xs={2}
            >
              {rows.map((row) => (
                <p
                  onClick={() => setSelectedUser(row.UserID)}
                  style={{
                    boxShadow:
                      "inset -4px -2px 17px -6px rgba(204,205,234,0.52)",
                    color: "black",
                    padding: "10px",
                    margin: "4px",
                    fontSize: "12px",
                    backgroundColor:
                      selectedUser === row.UserID
                        ? "rgb(167, 190, 255)"
                        : "white",
                  }}
                >
                  {row.User}
                </p>
              ))}
            </Grid>
          )}
          {/* 3rd item */}
          {selectedUser === null ? (
            ""
          ) : (
            <Grid
              style={{
                height: "80vh",
                overflow: "scroll",
                //
              }}
              item
              xs={3}
            >
              {rows.map((row) => (
                <p
                  onClick={() => setSelectedPost(row.PostID.$oid)}
                  style={{
                    boxShadow:
                      "inset -4px -2px 17px -6px rgba(204,205,234,0.52)",
                    color: "black",
                    padding: "10px",
                    margin: "4px",
                    fontSize: "12px",
                    backgroundColor:
                      selectedPost === row.PostID.$oid
                        ? "rgb(167, 190, 255)"
                        : "white",
                  }}
                >
                  {row.PostID.$oid}
                </p>
              ))}
            </Grid>
          )}
          {/* 4th item */}
          {selectedPost === null ? (
            ""
          ) : (
            <Grid
              style={{
                height: "80vh",
                overflow: "scroll",
                //
              }}
              item
              xs={1}
            >
              {rows.map((row) => (
                <p
                  style={{
                    boxShadow:
                      "inset -4px -2px 17px -6px rgba(204,205,234,0.52)",
                    color: "black",
                    padding: "10px",
                    margin: "4px",
                    fontSize: "12px",
                    backgroundColor:
                      selectedPost === row.PostID.$oid ? "#f1cc9f" : "white",
                  }}
                >
                  {row.Date}
                </p>
              ))}
            </Grid>
          )}
          {/* 5th item */}
          {selectedPost === null ? (
            ""
          ) : (
            <Grid
              style={{
                height: "80vh",
                overflow: "scroll",
                //
              }}
              item
              xs={1}
            >
              {rows.map((row) => (
                <p
                  onClick={() => setSelectedPost(row.PostID.$oid)}
                  style={{
                    boxShadow:
                      "inset -4px -2px 17px -6px rgba(204,205,234,0.52)",
                    color: "black",
                    padding: "10px",
                    margin: "4px",
                    fontSize: "12px",
                    backgroundColor:
                      selectedPost === row.PostID.$oid ? "#f1cc9f" : "white",
                  }}
                >
                  {row.View}
                </p>
              ))}
            </Grid>
          )}
          {/* 6th item */}
          {selectedPost === null ? (
            ""
          ) : (
            <Grid
              style={{
                height: "80vh",
                overflow: "scroll",
                //
              }}
              item
              xs={1}
            >
              {rows.map((row) => (
                <p
                  onClick={() => setSelectedPost(row.PostID.$oid)}
                  style={{
                    boxShadow:
                      "inset -4px -2px 17px -6px rgba(204,205,234,0.52)",
                    color: "black",
                    padding: "10px",
                    margin: "4px",
                    fontSize: "12px",
                    backgroundColor:
                      selectedPost === row.PostID.$oid ? "#f1cc9f" : "white",
                  }}
                >
                  {row.Budget}
                </p>
              ))}
            </Grid>
          )}
          {/* 6th item */}
          {selectedPost === null ? (
            ""
          ) : (
            <Grid
              style={{
                height: "80vh",
                overflow: "scroll",
                //
              }}
              item
              xs={1}
            >
              {rows.map((row) => (
                <p
                  onClick={() => setSelectedPost(row.PostID.$oid)}
                  style={{
                    boxShadow:
                      "inset -4px -2px 17px -6px rgba(204,205,234,0.52)",
                    color: "black",
                    padding: "10px",
                    margin: "4px",
                    fontSize: "12px",
                    backgroundColor:
                      selectedPost === row.PostID.$oid ? "#f1cc9f" : "white",
                  }}
                >
                  {row.Expire}
                </p>
              ))}
            </Grid>
          )}

          {/* 8th item */}
          {selectedPost === null ? (
            ""
          ) : (
            <Grid
              style={{
                height: "80vh",
                overflow: "scroll",
                //
              }}
              item
              xs={2}
            >
              {rows.map((row) => (
                <p
                  onClick={() => setSelectedPost(row.PostID.$oid)}
                  style={{
                    padding: "10px",
                    backgroundColor:
                      selectedPost === row.PostID.$oid ? "#f1cc9f" : "white",
                  }}
                >
                  <p className="d-flex">
                    {/* <Success />
                    <Rejection /> */}
                    <p>
                      {" "}
                      <Success />
                      <Rejection />{" "}
                    </p>
                  </p>
                </p>
              ))}
            </Grid>
          )}
        </Grid>
      </div>
      {/* table of contents */}
      {/* <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.visible}>
            <TableRow>
              <TableCell className="tablecellHeader">Country</TableCell>
              <TableCell className="tablecellHeader">User</TableCell>
              <TableCell className="tablecellHeader">PostID</TableCell>
              <TableCell className="tablecellHeader">Date</TableCell>
              <TableCell className="tablecellHeader">View</TableCell>
              <TableCell className="tablecellHeader">Budget</TableCell>
              <TableCell className="tablecellHeader">Expire</TableCell>
              <TableCell className="tablecellHeader">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.CountryName}>
                selec any country name

                <TableCell
                  style={{}}
                  className="tablecell"
                  component="th"
                  scope="row"
                ></TableCell>

                set user table coll data by selecting country name 
                {selectedItem === null ? (
                  ""
                ) : (
                  <TableCell
                    style={{
                      backgroundColor:
                        selectedUser === row.UserID
                          ? "rgb(167, 190, 255)"
                          : "white",
                    }}
                    className="tablecell"
                    align="right"
                  >
                    {row.User}
                  </TableCell>
                )}
                set post table coll data by selecting user name 
                {selectedUser === null ? (
                  ""
                ) : (
                  <TableCell
                    className="tablecell"
                    onClick={() => setSelectedPost(row.PostID.$oid)}
                    align="right"
                  >
                    {row.PostID.$oid}
                  </TableCell>
                )}
                set all remind data by  selecting post id 
                {selectedPost === null ? (
                  ""
                ) : (
                  <TableCell
                    className="tablecell"
                    onClick={() => setSelectedPost(row.PostID.$oid)}
                    align="right"
                  >
                    {row.Date}
                  </TableCell>
                )}
                {selectedPost === null ? (
                  ""
                ) : (
                  <TableCell
                    className="tablecell"
                    onClick={() => setSelectedPost(row.PostID.$oid)}
                    align="right"
                  >
                    {row.View}
                  </TableCell>
                )}
                {selectedPost === null ? (
                  ""
                ) : (
                  <TableCell
                    className="tablecell"
                    onClick={() => setSelectedPost(row.PostID.$oid)}
                    align="right"
                  >
                    {row.Budget}
                  </TableCell>
                )}
                {selectedPost === null ? (
                  ""
                ) : (
                  <TableCell
                    className="tablecell"
                    onClick={() => setSelectedPost(row.PostID.$oid)}
                    align="right"
                  >
                    {row.Expire}
                  </TableCell>
                )}
                {selectedPost === null ? (
                  ""
                ) : (
                  <TableCell
                    className="tablecell"
                    onClick={() => setSelectedPost(row.PostID.$oid)}
                    align="right"
                  >
                    <div c>
                      {<Success />}
                      {<Rejection />}
                    </div>
                  </TableCell>
                )}

                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={2}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid> */}
    </div>

    // ager jn er code
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
