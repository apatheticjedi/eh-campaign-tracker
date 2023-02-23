import React from 'react';
import { Link } from 'react-router-dom';

const CampaignList = ({ campaigns, status }) => {
  if (!campaigns.length) {
    return <h3>No Campaigns Yet</h3>;
  }

  return (
    <div>
      <h3>{status}</h3>
      {campaigns &&
        campaigns.map(campaign => (
          <div key={campaign._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${campaign.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {campaign.username}
              </Link>{' '}
              campaign on {campaign.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/campaign/${campaign._id}`}>
                <p>{campaign.status}</p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CampaignList;