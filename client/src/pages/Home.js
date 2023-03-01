import React from 'react';
import { useQuery } from '@apollo/client';
import CampaignList from '../components/CampaignList';
import { QUERY_ME, QUERY_CAMPAIGNS } from '../utils/queries';
import Auth from '../utils/auth';

const Home = () => {
    const { loading, data } = useQuery(QUERY_CAMPAIGNS);
    // const { data: userData } = useQuery(QUERY_ME);
    const campaigns = data?.campaigns || [];
    const loggedIn = Auth.loggedIn();

    return (
        <main>
        <div className="flex-row justify-space-between">
          {loggedIn && (
            <div className='col-12 mb-3'>
            </div>
          )}
          <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <CampaignList
                campaigns={campaigns}
              />
            )}
          </div>
        </div>
      </main>
    );
};

export default Home;