import React from 'react'
import {
  Switch,
  Route,
  Link
} from "react-router-dom"

const TestPage = () => <div>Test page <Link to='/about'>Go to test 2</Link></div>
const TestPage2 = () => <div>Test page 2<Link to='/'>Go to test </Link></div>
const NoMatch = () => <div>No Match</div>

const AppRouter = () => {
  return <Switch>
    <Route exact path="/">
      <TestPage/>
    </Route>
    <Route path="/about">
      <TestPage2/>
    </Route>
    <Route>
      <NoMatch/>
    </Route>
  </Switch>

}

export default AppRouter
