import React, { useEffect, useState } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col
} from 'reactstrap';
import classnames from 'classnames';
import Arrays from './Arrays';
import Hashmap from './Hashmap';
import Strings from './Strings';
import Stack from './Stack';
import Queue from './Queue';
import { Link } from 'react-router-dom';
import Linkedlist from './Linkedlist';
import httpInjectorService from '../../services/http-injector.service';

const Topics = () => {
  const [activeTab, setActiveTab] = useState('1');
  const userId = Number(localStorage.getItem('userId'));
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchStatus();
  }, [activeTab]);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const fetchStatus = async () => {
    try {
      const response = await httpInjectorService.fetchStatus(userId);
      if (response.status === 'success') {
        setUserData(response.data);
      } else {
        console.log('Error fetching user status');
      }
    } catch (error) {
      console.error('Error fetching user status:', error);
    }
  };

  // Helper: check if topic is done
  const isTopicDone = (topicId) => {
    const topic = userData.find((t) => t.topic_id === topicId);
    return topic && topic.questions_solved_count === 6;
  };

  return (
    <div>
      <h2 className="mb-4" style={{ marginLeft: '70px' }}>Topics</h2>

      <div style={{ paddingLeft: '70px' }}>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => toggle('1')}
            >
              Strings {isTopicDone(1) && <span className="badge bg-success ms-2">Done</span>}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => toggle('2')}
            >
              Arrays {isTopicDone(2) && <span className="badge bg-success ms-2">Done</span>}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => toggle('3')}
            >
              Stack {isTopicDone(3) && <span className="badge bg-success ms-2">Done</span>}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '4' })}
              onClick={() => toggle('4')}
            >
              Queue {isTopicDone(4) && <span className="badge bg-success ms-2">Done</span>}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '5' })}
              onClick={() => toggle('5')}
            >
              Linked Lists {isTopicDone(5) && <span className="badge bg-success ms-2">Done</span>}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '6' })}
              onClick={() => toggle('6')}
            >
              Hashmap {isTopicDone(6) && <span className="badge bg-success ms-2">Done</span>}
            </NavLink>
          </NavItem>
        </Nav>

        {/* Tab Content */}
        <TabContent activeTab={activeTab} className="mt-3">
          <TabPane tabId="1">
            <Strings key={activeTab} />
          </TabPane>
          <TabPane tabId="2">
            <Arrays key={activeTab} />
          </TabPane>
          <TabPane tabId="3">
            <Stack key={activeTab} />
          </TabPane>
          <TabPane tabId="4">
            <Queue key={activeTab} />
          </TabPane>
          <TabPane tabId="5">
            <Linkedlist key={activeTab} />
          </TabPane>
          <TabPane tabId="6">
            <Hashmap key={activeTab} />
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default Topics;