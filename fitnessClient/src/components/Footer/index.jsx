/*
 * @Author: Zoey
 * @Date: 2023-04-24 16:45:23
 * @LastEditors: Zoey
 * @LastEditTime: 2023-04-27 15:14:09
 * @Descripttion:
 */
import React from 'react';
import './index.less';
const Footer = () => {
  return (
    <div className="footer">
      <div className="center">
        <div className="top">
          <div className="left">
            <div className="logo"></div>
            <p>WORKOUT COMPLETE™</p>
          </div>
          <div className="right">
            <ul>
              <li>WORKOUTS</li>
              <li>WORKOUT VIDEOS</li>
              <li>CUSTOM WORKOUTS</li>
            </ul>
            <ul>
              <li>PROGRAMS</li>
              <li>WORKOUT PROGRAMS</li>
              <li>MEAL PLANS</li>
            </ul>
            <ul>
              <li>HEALTHY LIVING</li>
              <li>EXPERT ARTICLES</li>
              <li>HEALTHY RECIPES</li>
              <li>WELLNESS VIDEOS</li>
            </ul>
            <ul>
              <li>ABOUT</li>
              <li>OUR TEAM</li>
            </ul>
          </div>
        </div>
        <p className="tips">
          Copyright © 2023 Fitness Blender. All rights reserved. Terms of Use
          Privacy Policy
        </p>
      </div>
    </div>
  );
};
export default Footer;
