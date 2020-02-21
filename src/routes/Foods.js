//Food는 콤포넌트


import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Label } from 'semantic-ui-react'


function ShowFood({ foodCd, foodNm, foodKindNm, largeCls, middleCls, smallCls }) {
    return (
        <Table.Row>
            <Table.Cell width={1}>
                {foodCd}
            </Table.Cell>
            <Table.Cell width={1}>
                {foodNm}
            </Table.Cell>
            <Table.Cell width={1}>
                {foodKindNm} > {largeCls} > {middleCls} > {smallCls}
            </Table.Cell>
            <Table.Cell width={1}>
                <Link to={{
                    pathname: `/details/${foodCd}/`,
                    state: { foodCd, foodNm }
                }}>
                    <Label>한의문헌정보</Label>
                </Link>
                <Link to={{
                    pathname: `/details_science/${foodCd}/`,
                    state: { foodCd, foodNm }
                }}>
                    <span> </span><Label>학술정보</Label>
                </Link>
            </Table.Cell>
        </Table.Row>
    )
}

export default ShowFood;

//9	대표식품 목록 및 분류
//353 page까지 있음. 
//foodCd: "100003"
//foodNm: "가루전병"
//foodKindNm: "복합식품"
//largeClsNm: "부식"
//middleClsNm: "구이류"
//smallClsNm: "전"
//tradFoodCnt: "1"