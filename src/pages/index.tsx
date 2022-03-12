import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import Home from '../views/homepage/homepage'
import Issue from '../views/issue/issue'
import Page from '../views/project/project'
import Issue_0 from '../copy/issue/0'

const ISSUES = [Issue_0]

import { useLayoutEffect } from 'react'

const ScrollToTop = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
} 

export default function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          {renderIssueOverviews()}
          {renderProjectPages()}
        </Routes>
      </ScrollToTop>
    </Router>
  );
}

const renderIssueOverviews = () => ISSUES.map((issue, index) => 
  <Route key={issue.name} path={`/issue/${index}`} element={<Issue name={issue.name} overview={issue.overview} />} />)

const renderProjectPages = () => ISSUES.map((issue, index) => _buildIssuePages(index, issue))

const _buildIssuePages = (issueId, issue) => Object.keys(issue.data).map((projectKey) => {
  const project = issue.data[projectKey]
  return <Route key={`${projectKey}-path`} path={project.path} element={
    <Page key={`${projectKey}-page`} issueId={issueId} projectId={projectKey} issue={issue} />
  } />
})
