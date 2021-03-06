/*
 *
 * HomePage
 *
 */
/* eslint-disable */
import React, { memo, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import get from "lodash/get";
import upperFirst from "lodash/upperFirst";
import { auth, LoadingIndicatorPage } from "strapi-helper-plugin";
import PageTitle from "../../components/PageTitle";
import { useModels } from "../../hooks";

import useFetch from "./hooks";
import {
  ALink,
  Block,
  Container,
  LinkWrapper,
  P,
  Wave,
  Separator,
  SocialLinkWrapper,
} from "./components";

import SocialLink from "./SocialLink";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    link: "https://facebook.com/ietnitk",
  },
  {
    name: "LinkedIn",
    link: "https://linkedin.com/in/ietnitk",
  },
  { href: "https://www.github.com/IET-NITK", name: "Github" },
  { href: "https://t.me/IET_NITK", name: "Telegram" },
  { href: "https://www.youtube.com/c/IETNITK", name: "Youtube" },
  { href: "https://www.instagram.com/ietnitk", name: "Instagram" },
  {
    name: "Website",
    link: "https://iet.nitk.ac.in",
  },
];

const HomePage = ({ history: { push } }) => {
  const { error, isLoading, posts } = useFetch();
  // Temporary until we develop the menu API
  const {
    collectionTypes,
    singleTypes,
    isLoading: isLoadingForModels,
  } = useModels();

  const handleClick = (e) => {
    e.preventDefault();

    push(
      "/plugins/content-type-builder/content-types/plugins::users-permissions.user?modalType=contentType&kind=collectionType&actionType=create&settingType=base&forTarget=contentType&headerId=content-type-builder.modalForm.contentType.header-create&header_icon_isCustom_1=false&header_icon_name_1=contentType&header_label_1=null"
    );
  };

  const hasAlreadyCreatedContentTypes = useMemo(() => {
    const filterContentTypes = (contentTypes) =>
      contentTypes.filter((c) => c.isDisplayed);

    return (
      filterContentTypes(collectionTypes).length > 1 ||
      filterContentTypes(singleTypes).length > 0
    );
  }, [collectionTypes, singleTypes]);

  if (isLoadingForModels) {
    return <LoadingIndicatorPage />;
  }

  const headerId = hasAlreadyCreatedContentTypes
    ? "HomePage.greetings"
    : "app.components.HomePage.welcome";
  const username = get(auth.getUserInfo(), "firstname", "");
  const linkProps = hasAlreadyCreatedContentTypes
    ? {
        id: "app.components.HomePage.button.blog",
        href: "https://iet.nitk.ac.in/",
        onClick: () => {},
        type: "blog",
        target: "_blank",
      }
    : {
        id: "app.components.HomePage.create",
        href: "",
        onClick: handleClick,
        type: "documentation",
      };

  return (
    <>
      <FormattedMessage id="HomePage.helmet.title">
        {(title) => <PageTitle title={title} />}
      </FormattedMessage>
      <Container className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <Block>
              <Wave />
              <FormattedMessage
                id={headerId}
                values={{
                  name: upperFirst(username),
                }}
              >
                {(msg) => <h2 id="mainHeader">{msg}</h2>}
              </FormattedMessage>
              {hasAlreadyCreatedContentTypes ? (
                <FormattedMessage id="app.components.HomePage.welcomeBlock.content.again">
                  {(msg) => (
                    <P>
                      Welcome to IET NITK's Official Content Management System
                      (CMS). This will be the centrepoint of all things
                      IET-NITK: Blogging, Project records, Events and you name
                      it.. Have a fun time!
                    </P>
                  )}
                </FormattedMessage>
              ) : (
                <FormattedMessage id="HomePage.welcome.congrats">
                  {(congrats) => {
                    return (
                      <FormattedMessage id="HomePage.welcome.congrats.content">
                        {(content) => {
                          return (
                            <FormattedMessage id="HomePage.welcome.congrats.content.bold">
                              {(boldContent) => {
                                return (
                                  <P>
                                    <b>{congrats}</b>&nbsp;
                                    {content}&nbsp;
                                    <b>{boldContent}</b>
                                  </P>
                                );
                              }}
                            </FormattedMessage>
                          );
                        }}
                      </FormattedMessage>
                    );
                  }}
                </FormattedMessage>
              )}
              {hasAlreadyCreatedContentTypes && (
                <div style={{ marginTop: isLoading ? 60 : 50 }}>
                  We plan to show what content is editable by what role, so that
                  you can conveniently contact the right person to make the
                  change.
                </div>
              )}
              <FormattedMessage id={linkProps.id}>
                {(msg) => (
                  <ALink
                    rel="noopener noreferrer"
                    {...linkProps}
                    style={{ verticalAlign: " bottom", marginBottom: 5 }}
                  >
                    Open IET-NITK Website
                  </ALink>
                )}
              </FormattedMessage>
            </Block>
          </div>

          <div className="col-md-12 col-lg-4">
            <Block style={{ paddingRight: 30, paddingBottom: 0 }}>
              <FormattedMessage id="HomePage.community">
                {(msg) => <h2>Follow IET-NITK</h2>}
              </FormattedMessage>
              <FormattedMessage id="app.components.HomePage.community.content">
                {(content) => (
                  <P style={{ marginTop: 7, marginBottom: 0 }}>
                    We rely on each and every one of our members to advertise
                    and promote our events. Please follow us, like and re-share
                    our posts on the following social media platforms.
                  </P>
                )}
              </FormattedMessage>

              <div
                className="row social-wrapper"
                style={{
                  display: "flex",
                  margin: 0,
                  marginTop: 36,
                  marginLeft: -15,
                }}
              >
                {SOCIAL_LINKS.map((value, key) => (
                  <>
                    <SocialLinkWrapper key={key} className="col-6">
                      <a
                        href={value.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{value.name}</span>
                      </a>
                    </SocialLinkWrapper>
                  </>
                ))}
              </div>
            </Block>
          </div>
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);
