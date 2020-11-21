import {
  Button,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  UncontrolledButtonDropdown,
} from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'
import React, { Fragment } from 'react'
import { observer, useObserver } from 'mobx-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { auth } from '../../../api/firebase'
import city3 from '../../../assets/architectui/utils/images/dropdown-header/city3.jpg'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { notifyError } from '../../../components/notifications/error'
import to from 'await-to-js'
import { useAuthStore } from '../../../modules/Auth/store/AuthenticationStore'
import { useTranslation } from 'react-i18next'

const useStores = () => {
  const { AuthStore } = useAuthStore()

  return useObserver(() => ({
    user: AuthStore.user,
    logOut: AuthStore.logOut,
  }))
}

export const UserBox = observer(() => {
  const history = useHistory()
  const { logOut, user } = useStores()
  const { t } = useTranslation()

  if (!user) {
    return null
  }

  const handleLogOut = async () => {
    logOut()
    const [error] = await to(auth.signOut())
    if (error) {
      notifyError(error.message)
    }
    history.push('/login')
  }

  const displayName = user.profile?.name || user.phoneNumber
  const displayNameEllipsis =
    displayName.length < 11 ? displayName : displayName.substring(0, 7) + '...'

  return (
    <Fragment>
      <div className="header-btn-lg pr-0">
        <div className="widget-content p-0">
          <div className="widget-content-wrapper">
            <div className="widget-content-left">
              <UncontrolledButtonDropdown>
                <DropdownToggle className="p-1 bg-transparent border-0">
                  <img
                    width={42}
                    className="rounded-circle mr-3"
                    src={user.profilePicture || '/profile.png'}
                    alt=""
                  />
                  <span>{displayNameEllipsis}</span>
                  <FontAwesomeIcon
                    className="ml-2 opacity-8"
                    icon={faAngleDown}
                  />
                </DropdownToggle>
                <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                  <div className="dropdown-menu-header">
                    <div className="dropdown-menu-header-inner bg-primary">
                      <div
                        className="menu-header-image opacity-2"
                        style={{
                          backgroundImage: 'url(' + city3 + ')',
                        }}
                      />
                      <div className="menu-header-content text-left">
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left mr-3">
                              <img
                                width={42}
                                className="rounded-circle"
                                src={user.profilePicture || '/profile.png'}
                                alt=""
                              />
                            </div>
                            <div className="widget-content-left">
                              <div className="widget-heading">
                                {user.displayName || user.phoneNumber}
                              </div>
                            </div>
                            <div className="widget-content-right mr-2">
                              <Button
                                onClick={handleLogOut}
                                className="btn-pill btn-shadow btn-shine bg-secondary"
                              >
                                {t('Logout')}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="scroll-area-xs"
                    style={{
                      height: '150px',
                    }}
                  >
                    <PerfectScrollbar>
                      <Nav vertical>
                        <NavItem className="nav-item-header">
                          {t('Account')}
                        </NavItem>
                        <NavItem>
                          <NavLink tag="div">
                            <Link to="/profile">{t('Profile')}</Link>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </PerfectScrollbar>
                  </div>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
})
