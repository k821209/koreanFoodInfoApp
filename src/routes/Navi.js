//navi도 콤포넌트
import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Menu, Segment, Search, Label, Container } from 'semantic-ui-react'
import _ from 'lodash'
import faker from 'faker'

const data = require('../foodListGrep.json');
const source = data.body
/*const source2 = _.times(5, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(0, 100, 2, '$'),
  }))*/
console.log(source)
const initialState = {
  activeItem: 'home',
  isLoading: false,
  value: '',
  results: [],
}



class Navigation extends React.Component {
  state = initialState

  resultRenderer = ({ foodCd, foodNm }) => {
    return (<Link to={{
      pathname: `/details/${foodCd}/`,
      state: { foodCd, foodNm }
    }}>
      <Label key={foodCd} content={foodNm} />
    </Link>)
  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  onChange = (x) => {
    console.log(x)
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.foodNm });
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.foodNm)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  render() {
    const { activeItem, isLoading, value, results } = this.state

    return (
      <Container style={{ marginTop: '0.5em' }}>
        <Menu pointing>
          <Menu.Item
            as={Link}
            to='/'
            name='Home'
            active={activeItem === 'Home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Contact'
            active={activeItem === 'Contact'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true,
                })}
                results={results}
                value={value}
                resultRenderer={this.resultRenderer}
                {...this.props}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    )
  }
}

export default Navigation;
