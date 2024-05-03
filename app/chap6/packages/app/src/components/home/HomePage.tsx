import { Page, Content, InfoCard } from '@backstage/core-components';
import {
  HomePageStarredEntities,
  HomePageToolkit,
  HomePageRecentlyVisited,
  TemplateBackstageLogoIcon,
  ComponentAccordion,
} from '@backstage/plugin-home';
import { HomePageSearchBar } from '@backstage/plugin-search';
import { SearchContextProvider } from '@backstage/plugin-search-react';
import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  searchBarInput: {
    maxWidth: '60vw',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '50px',
    boxShadow: theme.shadows[1],
  },
  searchBarOutline: {
    borderStyle: 'none',
  },
}));
export const InAccordion = () => {
  const ExpandedComponentAccordion = (props: any) => (
    <ComponentAccordion expanded {...props} />
  );
  return (
    <InfoCard title="Toolkit" noPadding>
      <Grid item>
        <HomePageToolkit
          title="Tools 1"
          tools={[
            {
              url: 'https://backstage.io/docs',
              label: 'Docs',
              icon: <TemplateBackstageLogoIcon />,
            },
            {
              url: 'https://github.com/backstage/backstage',
              label: 'GitHub',
              icon: <TemplateBackstageLogoIcon />,
            },
            {
              url: 'https://github.com/backstage/backstage/blob/master/CONTRIBUTING.md',
              label: 'Contributing',
              icon: <TemplateBackstageLogoIcon />,
            },
            {
              url: 'https://backstage.io/plugins',
              label: 'Plugins Directory',
              icon: <TemplateBackstageLogoIcon />,
            },
            {
              url: 'https://github.com/backstage/backstage/issues/new/choose',
              label: 'Submit New Issue',
              icon: <TemplateBackstageLogoIcon />,
            },
          ]}
          Renderer={ExpandedComponentAccordion}
        />
        <HomePageToolkit
          title="Tools 2"
          tools={Array(8).fill({
            url: '#',
            label: 'link',
            icon: <TemplateBackstageLogoIcon />,
          })}
          Renderer={ComponentAccordion}
        />
        <HomePageToolkit
          title="Tools 3"
          tools={Array(8).fill({
            url: '#',
            label: 'link',
            icon: <TemplateBackstageLogoIcon />,
          })}
          Renderer={ComponentAccordion}
        />
      </Grid>
    </InfoCard>
  );
};
export const HomePage = () => {
  const classes = useStyles();
  return (
    <SearchContextProvider>
      <Page themeId="home">
        <Content>
          <Grid container justifyContent="center" spacing={2}>
            <Grid container item xs={12} justifyContent="center">
              <HomePageSearchBar
                InputProps={{
                  classes: {
                    root: classes.searchBarInput,
                    notchedOutline: classes.searchBarOutline,
                  },
                }}
                placeholder="Search"
              />
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12} md={6}>
                <InAccordion />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container direction="column" spacing={2}>
                  <Grid item xs={12}>
                    <HomePageRecentlyVisited />
                  </Grid>
                  <Grid item xs={12}>
                    <HomePageStarredEntities />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Content>
      </Page>
    </SearchContextProvider>
  );
};
