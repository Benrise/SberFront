import React from 'react';
import './content.scss';

interface HeaderTextBody {
    title: string;
    description?: string;
}

interface PanelConfig {
    text?: HeaderTextBody;
    toolbarButtons?: React.ReactNode[];
    body: React.ReactNode;
    extraAction?: React.ReactNode;
}

export interface ContentProps {
    mainPanel: PanelConfig;
    additionalPanel?: PanelConfig;
    reversed?: boolean;
}

export const Content: React.FC<ContentProps> = ({ mainPanel, additionalPanel, reversed }) => {
  return (
    <div className={`content ${reversed ? 'flex-row-reverse' : ''}`}>
        {additionalPanel && (
            <div className="flex flex-col gap-6 w-[25%]">
                <div className="content__additional-panel">
                    {additionalPanel.text && (
                        <div className="content__header header">
                            <div className="content-header__text">
                                <div className="content-header__title">
                                    {additionalPanel.text.title}
                                </div>
                                <div className="content-header__description">
                                    {additionalPanel.text.description}
                                </div>
                            </div>
                            <div className="content-header__toolbar">
                                {mainPanel.toolbarButtons}
                            </div>
                        </div>
                    )}
                    <div className="content__body">
                        {additionalPanel.body}
                    </div>
                </div>
                {additionalPanel.extraAction}
            </div>
        )}
         <div className={`content__main-panel ${!!additionalPanel ? 'w-[75%]' : 'w-full'}`}>
            {mainPanel.text && (
                <div className="content__header content-header">
                    <div className="content-header__text">
                        <div className="content-header__title">
                            {mainPanel.text.title}
                        </div>
                        <div className="content-header__description">
                            {mainPanel.text.description}
                        </div>
                    </div>
                    <div className="content-header__toolbar">
                        {mainPanel.toolbarButtons && mainPanel.toolbarButtons.map((button, index) => (
                            <React.Fragment key={index}>
                                {button}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}
            <div className="content__body">
                {mainPanel.body}
            </div>
         </div>
    </div>
  );
};
