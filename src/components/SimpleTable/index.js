import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    }
  }
  ,
  table: {
    minWidth: 700,
  },
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#0098fb",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 20,
  },
}))(TableCell);

function createData(data) {
  var objects = [];
  if (data !== "no"){
    for (var i = 0; i < data.data.length; i++) {
      var name = data.data[i].Name;
      var major = data.data[i].Major;
      var interest = data.data[i].Interest;
      var degree = data.data[i].Degree;
      var average = data.data[i].Average;
      objects[i] = { id: i, name, major, interest, degree, average};
    }
  }
  else objects[0] = {id: 0, name : "-", major : "-", interest: "-", degree: "-", average: "-"}
  return objects;
}

class SimpleTable extends React.Component {

  constructor(props) {
    super(props);

  }
  makeTable(data) {

    const rows = createData(data);
    const { classes } = this.props;
    return (
      <div id="container">
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell align="center">Name</CustomTableCell>
              <CustomTableCell align="center">Interest</CustomTableCell>
              <CustomTableCell align="center">Major</CustomTableCell>
              <CustomTableCell align="center">Degree</CustomTableCell>
              <CustomTableCell align="center">Average Skill Level</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell align="center">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.interest}</TableCell>
                <TableCell align="center">{row.major}</TableCell>
                <TableCell align="center">{row.degree}</TableCell>
                <TableCell align="center">{row.average}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      </div>
    );
  }

  

  render() {
    if(this.props.data.length !== 0) {
      return this.makeTable(this.props)}
    else {
      return this.makeTable("no")
    }
    

  }
}



SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);