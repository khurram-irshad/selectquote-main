import * as Contentful from 'contentful';

interface Agent {
    name?: Contentful.EntryFields.Symbol;
    designation?: Contentful.Entry<any>;
    description?: Contentful.EntryFields.Symbol;
}

interface AgentReview {
    status?: Contentful.EntryFields.Symbol;
    agent?: Contentful.Entry<Agent>;
    backgroundColor?: Contentful.EntryFields.Symbol;
    lastReviewDate?:  Contentful.EntryFields.Date;
    fullWidth: Contentful.EntryFields.Symbol;
}

export type Type_AgentReview = Contentful.Entry<AgentReview>;
