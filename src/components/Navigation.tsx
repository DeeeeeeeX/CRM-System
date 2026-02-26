import React from 'react';
import logo from '../assets/sidebar/Logogram.svg';
import dashboard from '../assets/sidebar/ChartPie.svg';
import bell from '../assets/sidebar/Bell.svg';
import noteBlank from '../assets/sidebar/NoteBlank.svg';
import tasks from '../assets/sidebar/Tasks.svg';
import {Link} from 'react-router-dom';
import email from '../assets/sidebar/email.svg';
import calendar from '../assets/sidebar/Calendar.svg';
import analytics from '../assets/sidebar/ChartLineUp.svg';
import contacts from '../assets/sidebar/AddressBook.svg';
import companies from '../assets/sidebar/Briefcase.svg';
import integrations from '../assets/sidebar/SquaresFour.svg';
import settings from '../assets/sidebar/Gear.svg';

const Navigation: React.FC = ({token}: { token: string }) => {
  return (
    <nav className="menu">
      <div className="menu-header">
        <div className="menu-header-item">
          <img src={logo} alt="logo"/>
          <span>Venture</span>
        </div>
      </div>
      <div className="menu-navigation">
        <div className="menu-main">
          <ul>
            <li>
              <img src={dashboard} alt="dashboard"/>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <img src={bell} alt="bell"/>
              <a href="#">Notification</a>
            </li>
            <li>
              <img src={noteBlank} alt="noteBlank"/>
              <a href="#">Notes</a>
            </li>
            <li className="link-active">
              <img src={tasks} alt="tasks"/>
              <Link to="/">Tasks</Link>
            </li>
            <li>
              <img src={email} alt="email"/>
              <a href="#">Emails</a>
            </li>
            <li>
              <img src={calendar} alt="calendar"/>
              <a href="#">Calendars</a>
            </li>
          </ul>
        </div>
        <div className="menu-main menu-database">
          <ul>
            <h3>DATABASE</h3>
            <li>
              <img src={analytics} alt="analytics"/>
              <a href="">Analytics</a>
            </li>
            <li>
              <img src={contacts} alt="contacts"/>
              <a href="">Contacts</a>
            </li>
            <li>
              <img src={companies} alt="companies"/>
              <a href="">Companies</a>
            </li>
          </ul>
        </div>
        <div className="menu-main menu-settings">
          <ul>
            <li>
              <img src={integrations} alt="integrations"/>
              <a href="">Integrations</a>
            </li>
            <li>
              <img src={settings} alt="settings"/>
              <a href="">Settings</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="menu-profile">
        {token ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <>
            <Link to='/profile'>Profile</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
