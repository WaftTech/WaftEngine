/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Link } from "react-router-dom";
import {Icon, Button, TextField} from "@material-ui/core";
import logo from "assets/img/logo.png";
import rest1 from "assets/img/rest1.jpg";
import styled from "styled-components";


const Masthead =  styled.div`
background:#690 url(../assets/img/logo.png) center top; 
background-attachement:fixed;
height:350px; padding-top:20px; color:#fff;
`;


const CategoryItem =  styled.div`
box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
border-radius: 200px;
padding: 30px 50px;
`;






/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
    render() {
        return (
            <section className="">
                <header className="el-header header-main">
                    <div className="container">
                        <div className="logo">
                            <Link to="/"><img src={logo} /></Link>
                        </div>

                        <Link className="button primary" to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                </header>

                <Masthead>
                    <div className="search-container">
                        <h2>Ask To Marina</h2>
                        <strong className="content-title">BE A PART OF THE LOCAL SEARCH REVOLUTION</strong>
<br/>
                        <TextField fullWidth />
                    </div>
                </Masthead>


                <CategoryItem>
                    <div className="media-info">
                    <div className="img">
                    <img src={categoryIcon}/></div> 
                    <div className="info">
                    <strong><a href="#">Restaurant</a> </strong> 
                    <span className="designation">4606</span></div></div>
                
                </CategoryItem>

                <div className="card">
<img src={rest1} />
<h3>Thakali Restaurant</h3>
                    Opening Days:SUN, MON, TUE, WED, THU, FRI
<Icon>Star</Icon> 1234456
<Icon>Star</Icon>   State 3 Bhaktapur Thimi,hanumante Bridge
<Icon>Star</Icon>  Pincode: 123
<Icon>Star</Icon>  Opening Time:10AM-7PM
                    
                    
                

                   <Icon>Star</Icon> 99999999999
                   <Icon>Star</Icon> info@email.com
                   <Icon>Star</Icon> website.com
                    
</div>

            </section>


        );
    }
}
