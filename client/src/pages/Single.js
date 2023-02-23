import React from 'react';
import { useParams } from 'react-router-dom';

import CampaignList from '../components/CampaignList';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_CAMPAIGN } from '../utils/queries';

const Single = (props) => {
  const { id: campaignId } = useParams();

  const { loading, data } = useQuery(QUERY_CAMPAIGN, {
    variables: { id: campaignId },
  });

  const campaign = data?.campaign || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {campaign.username}
          </span>{' '}
          campaign on {campaign.createdAt}
        </p>
        <div className="card-body">
          <p>{campaign.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Single;