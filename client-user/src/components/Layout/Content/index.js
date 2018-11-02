import React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import loadable from 'react-loadable';
import LoadingComponent from 'components/Loading';
import { Layout } from 'antd';
const { Content } = Layout;

let Calendar = loadable({
  loader: () => import('routes/calendar/'),
  loading: LoadingComponent
})
let Card = loadable({
  loader: () => import('routes/card/'),
  loading: LoadingComponent
})
let Chart = loadable({
  loader: () => import('routes/chart/'),
  loading: LoadingComponent
})
let Dashboard = loadable({
  loader: () => import('routes/dashboard/'),
  loading: LoadingComponent
})
let ECommerce = loadable({
  loader: () => import('routes/ecommerce/'),
  loading: LoadingComponent
})
let Feedback = loadable({
  loader: () => import('routes/feedback/'),
  loading: LoadingComponent
})
let Form = loadable({
  loader: () => import('routes/form/'),
  loading: LoadingComponent
})
let Foundation = loadable({
  loader: () => import('routes/foundation/'),
  loading: LoadingComponent
})
let AppLayout = loadable({
  loader: () => import('routes/layout/'),
  loading: LoadingComponent
})
let Page = loadable({
  loader: () => import('routes/page/'),
  loading: LoadingComponent
})
let Table = loadable({
  loader: () => import('routes/table/'),
  loading: LoadingComponent
})
let UI = loadable({
  loader: () => import('routes/ui/'),
  loading: LoadingComponent
})
let UIOverview = loadable({
  loader: () => import('routes/ui-overview/'),
  loading: LoadingComponent
})
let Exception = loadable({
  loader: () => import('routes/exception/'),
  loading: LoadingComponent
})



class AppContent extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Content id='app-content'>
        <Route path={`${match.url}/dashboard`} component={Dashboard} />
        <Route path={`${match.url}/calendar`} component={Calendar} />
        <Route path={`${match.url}/card`} component={Card}/>
        <Route path={`${match.url}/chart`} component={Chart} />
        <Route path={`${match.url}/ecommerce`} component={ECommerce} />
        <Route path={`${match.url}/exception`} component={Exception} />
        <Route path={`${match.url}/feedback`} component={Feedback}/>
        <Route path={`${match.url}/form`} component={Form} />
        <Route path={`${match.url}/foundation`} component={Foundation} />
        <Route path={`${match.url}/layout`} component={AppLayout} />
        <Route path={`${match.url}/page`} component={Page} />
        <Route path={`${match.url}/table`} component={Table} />
        <Route path={`${match.url}/ui`} component={UI} />
        <Route path={`${match.url}/ui-overview`} component={UIOverview} />
      </Content>
    );
  }
}

export default withRouter(AppContent);
