import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../index.css';
import axios from "axios"
import ShowFood from "../routes/Foods"
import {
  Header,
  Segment,
  Table,
  Pagination,
  Container,
  Grid,
} from 'semantic-ui-react';


const style = {
  h1: {
    marginTop: '3em',
  },
  h2: {
    margin: '4em 0em 2em',
  },
  h3: {
    marginTop: '2em',
    padding: '2em 0em',
  },
  last: {
    marginBottom: '300px',
  },
}

class Home extends React.Component {
  state = {
    isLoading: true,
    foodObjs: [],
    currentPage: 1
  }

  changePage = async (e, page) => {
    console.log('changePage', page.activePage)
    await this.setState({ currentPage: page.activePage })
    this.getFoods();
  }
  getFoods = async () => {
    const { currentPage } = this.state;
    console.log(currentPage)
    const {
      data: {
        response: {
          body: {
            items: { item }
          }
        }
      }
    }
      = await axios.get(`https://cors-anywhere.herokuapp.com/https://tradifood.net/api/service/TradFoodInfoService/getFoodCateogryList?serviceKey=lLjoGCVK2fzZyHfHUXBIhIbHxQ8GhCmNpnKeFx4m4cfeUuneSaQMdhnxVeAcbN9CtEcRBnmMphI7zSwJL%2BJ7sg%3D%3D&pageNo=${currentPage}&numOfRows=10&type=JSON&SG_APIM=2ug8Dm9qNBfD32JLZGPN64f3EoTlkpD8kSOHWfXpyrY`)
    this.setState({ isLoading: false })
    // const foodNames = item.map(function(i){return i.foodNm})
    this.setState({ foodObjs: item })
  }
  componentDidMount() {
    this.getFoods();
  }
  render() {
    const { isLoading } = this.state
    const { foodObjs } = this.state
    console.log("example", foodObjs)
    return (
      <Container style={{ marginTop: '0.5em' }} textAlign="center" >
        <Segment>
          <Header content='한국음식 목록' textAlign='center' />
          <center>
            <Table collapsing style={{ width: '80%', top: '50%', left: '50%' }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>코드</Table.HeaderCell>
                  <Table.HeaderCell>음식명</Table.HeaderCell>
                  <Table.HeaderCell>분류</Table.HeaderCell>
                  <Table.HeaderCell>정보</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {isLoading
                  ? "Loading..."
                  : foodObjs.map(each => {
                    return (
                      <ShowFood
                        key={each.foodCd}
                        foodCd={each.foodCd}
                        foodNm={each.foodNm}
                        foodKindNm={each.foodKindNm}
                        largeCls={each.largeClsNm}
                        middleCls={each.middleClsNm}
                        smallCls={each.smallClsNm}
                      />
                    )
                  })
                }
              </Table.Body>
            </Table>
          </center>
        </Segment>
        <Pagination onPageChange={this.changePage} style={{ marginBottom: '1em' }} defaultActivePage={1} totalPages={353} />
      </Container>
    );
  }
}

export default Home;
