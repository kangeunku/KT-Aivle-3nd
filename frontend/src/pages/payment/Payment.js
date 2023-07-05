import React, { useState } from "react";

const Test = () => {

    return (
        <div className="aboutus_container">
            
            <section className="container_about">
                <div className="item">
                    <div className="quote">
                        <p>웹 디자인 및 프론트엔드</p>
                        <span className="name">이수지</span>
                    </div>
                </div>
                <div className="item">
                    <div className="quote">
                        <p>ai, 백엔드</p>
                        <span className="name">김원진</span>
                    </div>
                </div>
                <div className="item">
                    <div className="quote">
                        <p>ai, 백엔드</p>
                        <span className="name">강은구</span>
                    </div>
                </div>
                <div className="item">
                    <div className="quote">
                        <p>웹 디자인 및 프론트엔드</p>
                        <span className="name">모광윤</span>
                    </div>
                </div>
                <div className="item">
                    <div className="quote">
                        <p>ai, 백엔드, github 관리</p>
                        <span className="name">강호준</span>
                    </div>
                </div>
                <div className="item">
                    <div className="quote">
                        <p>프론트엔드, 백엔드</p>
                        <span className="name">주은호</span>
                    </div>
                </div>
            </section>
            <section className="second_section">
                <div class="container_type2">
                    <div class="card card0">
                        <div class="border">
                        <h2>김광호</h2>
                        <div class="icons">
                           BOSS <br/>
                           백엔드<br/>
                           프론트엔드
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export { Test };
