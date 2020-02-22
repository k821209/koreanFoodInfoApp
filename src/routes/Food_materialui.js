import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

console.log(rows)

const handleClick = () => {
    console.info('You clicked the Chip.');
  };

export default function SimpleTable({foodObjs}) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">음식코드</TableCell>
            <TableCell align="center">음식이름</TableCell>
            <TableCell align="center">음식분류</TableCell>
            <TableCell align="center">음식정보</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foodObjs.map(row => (
            <TableRow key={row.foodCd}>
              <TableCell component="th" scope="row" align="center">
                {row.foodCd}
              </TableCell>
              <TableCell align="center">{row.foodNm}</TableCell>
              <TableCell align="center">{row.foodKindNm} > {row.largeClsNm} > {row.middleClsNm} > {row.smallClsNm}</TableCell>
              <TableCell align="center">
                <Link to={{
                        pathname: `/details/${row.foodCd}/`,
                        state: {foodCd:row.foodCd, foodNm:row.foodNm }
                    }}>
                        <Chip label="한의문헌정보" onClick={handleClick}/>
                </Link>
                <span> </span>
                <Link to={{
                        pathname: `/details_science/${row.foodCd}/`,
                        state: {foodCd:row.foodCd, foodNm:row.foodNm }
                    }}>
                        <Chip label="학술정보" onClick={handleClick}/>
                </Link>
                  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
