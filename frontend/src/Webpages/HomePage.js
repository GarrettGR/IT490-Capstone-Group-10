import React from 'react'
// import { UserContext } from '../contexts/UserContext'

function HomePage() {
  // const { login } = useContext(UserContext) 

  return (
    <div>

      <body>

        <div className="home-page">
          <div>
            <div className="columnview">
              <div className="row_one">
                <div className="infobox">
                  <div className="rowdigital">

                    <div className="columndigital">

                      <button className="digital ui button teal_700 size-xs fill">AppliCare</button>

                      <div className="rowadvanced">
                        <h1 className="advanced ui heading size-heading2xl">Welcome to AppliCare</h1>
                      </div>

                      <div className="rowadvanced">
                        <p className="description-1 ui text size-textxl">
                          An application that allows maintanance for your household appliances.
                        </p>
                      </div>

                      <div className="rowget_started">
                        <a href='OurServices'>
                          <button className="get_started ui button black_900 size-xl fill">
                            <span>Get Started</span>
                            <img src="https://img.icons8.com/?size=100&id=39969&format=png&color=FFFFFF" alt="Arrow Right" className="arrow_right" />
                          </button>
                        </a>
                        <a href='#'>
                          <button className="how_it_works ui button teal_700 size-xl outline">
                            <span>How it Works</span>
                            <img src="https://cdn-icons-png.flaticon.com/512/664/664866.png" alt="Arrow Right" className="arrow_right" />
                          </button>
                        </a>
                      </div>

                    </div>

                    <div className="stackview">

                      <div className="view"></div>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZpuraoMCj_Bot0IN2YS5ZGDIH06u36Bqs1A&s" alt="Image" className="image" />

                    </div>

                  </div>

                </div>

              </div>

              <div className="columnsectioni">

                <div className="flex-col-center-center community">
                  <h2 className="sectiontitle ui heading size-headingmd">Manage you entire cataloge of household appliances</h2>
                  <p className="description ui text size-texts">What are you currently looking for?</p>
                </div>

                <div className="listmembershipo">

                  <div className="columnmembershi">
                    <div className="member">
                      <img src="https://e7.pngegg.com/pngimages/406/844/png-clipart-computer-icons-person-user-spark-icon-people-share-icon-thumbnail.png" alt="Membershiporgan" className="membershiporgan" />
                      <h3 className="membershiporgan-1 ui heading size-headingxs">Contact local workers</h3>
                    </div>
                    <p className="ourmembershipte ui text size-textxs">
                      Our worker management software provides full access to contact any local workers.
                    </p>
                  </div>

                  <div className="columnmembershi">
                    <div className="member">
                      <img src="https://cdn-icons-png.flaticon.com/512/3885/3885073.png" alt="Membershiporgan" className="membershiporgan" />
                      <h4 className="membershiporgan-1 ui heading size-headingxs">Parts Locator</h4>
                    </div>
                    <p className="ourmembershipte ui text size-textxs">
                      Our system allows users to find the location of parts they are looking for.
                    </p>
                  </div>

                  <div className="columnmembershi">
                    <div className="member">
                      <img src="https://cdn-icons-png.flaticon.com/512/992/992577.png" alt="Membershiporgan" className="membershiporgan" />
                      <h5 className="membershiporgan-1 ui heading size-headingxs">Hands on Instructions</h5>
                    </div>
                    <p className="ourmembershipte ui text-textxs">
                      Our service also allows users to partake in fixing their appliance on their own.
                    </p>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

      </body>


    </div>
  )
}

export default HomePage
