import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { ExampleFetchComponent } from '../ExampleFetchComponent';
// i18n用リソースImport
import { useTranslationRef } from '@backstage/core-plugin-api/alpha';
import { myPluginTranslationRef } from '../../translation';

export const ExampleComponent = () => {
  // i18n用リソースの使用
  const { t } = useTranslationRef(myPluginTranslationRef);

  return (
    <Page themeId="tool">
      <Header title={t('header.title')} subtitle={t('header.subtitle')}>
        <HeaderLabel label={t('header.owner')} value="Team X" />
        <HeaderLabel label={t('header.lifecycle')} value="Alpha" />
      </Header>
      <Content>
        <ContentHeader title={t('content.title')}>
          <SupportButton>{t('content.supportButtonDescription')}</SupportButton>
        </ContentHeader>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <InfoCard title={t('content.infoCardTitle')}>
              <Typography variant="body1">
                {t('content.infoCardContent')}
              </Typography>
            </InfoCard>
          </Grid>
          <Grid item>
            <ExampleFetchComponent />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};