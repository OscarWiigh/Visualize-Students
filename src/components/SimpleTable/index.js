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
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function createData(data) {
  var objects = [];
  if (data !== "no"){
    for (var i = 0; i < data.data.length; i++) {
      var name = data.data[i].Name;
      var major = data.data[i].Major;
      objects[i] = { id: i, name, major};
    }
  }
  else objects = {id: 0, name : "", major : ""}
  return objects;
}

class SimpleTable extends React.Component {

  constructor(props) {
    super(props);

  }

  // componentWillReceiveProps({ data }) {
  //   this.makeTable(data)
  // }

  makeTable(data) {

    const rows = createData(this.props);
    const { classes } = this.props;
    return (
      <div id="container">
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Major</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.major}</TableCell>
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