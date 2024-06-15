import React from 'react';
import './content.scss';

interface HeaderTextBody {
    title: string;
    description?: string;
}

interface PanelConfig {
    text: HeaderTextBody;
    toolbarButtons?: React.ReactNode;
    body: React.ReactNode;
}

export interface ContentProps {
    mainPanel: PanelConfig;
    additionalPanel: PanelConfig;
    reversed?: boolean;
}

export const Content: React.FC<ContentProps> = ({ mainPanel, additionalPanel, reversed }) => {
  return (
    <div className={`content ${reversed ? 'flex-row-reverse' : ''}`}>
        <div className="content__additional-panel">
            <div className="content__header header">
                <div className="header__text">
                    <div className="header__title">
                        {additionalPanel.text.title}
                    </div>
                    <div className="header__description">
                        {additionalPanel.text.description}
                    </div>
                </div>
                <div className="header__toolbar">
                    {mainPanel.toolbarButtons}
                </div>
            </div>
            <div className="content__body">
                {additionalPanel.body}
            </div>
        </div>
         <div className="content__main-panel">
            <div className="content__header header">
                <div className="header__text">
                    <div className="header__title">
                        {mainPanel.text.title}
                    </div>
                    <div className="header__description">
                        {mainPanel.text.description}
                    </div>
                </div>
                <div className="header__toolbar">
                    {mainPanel.toolbarButtons}
                </div>
            </div>
            <div className="content__body">
                {mainPanel.body}
            </div>
         </div>
    </div>
  );
};
