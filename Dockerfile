# this tells docker to use node image with ubuntu linux distribution
FROM node:16-alpine

ARG E_SITE_URL
ENV SITE_URL=$E_SITE_URL

ARG E_CONTENTFUL_SPACE_ID
ENV CONTENTFUL_SPACE_ID=$E_CONTENTFUL_SPACE_ID

ARG E_CONTENTFUL_ACCESS_TOKEN
ENV CONTENTFUL_ACCESS_TOKEN=$E_CONTENTFUL_ACCESS_TOKEN

ARG E_CONTENTFUL_PREVIEW_ACCESS_TOKEN
ENV CONTENTFUL_PREVIEW_ACCESS_TOKEN=$E_CONTENTFUL_PREVIEW_ACCESS_TOKEN

ARG E_CONTENTFUL_ENVIRONMENT
ENV CONTENTFUL_ENVIRONMENT=$E_CONTENTFUL_ENVIRONMENT

ENV PORT=80

# this sets the working directory to the /app
WORKDIR /app
# this copies package.json into the /app directory in the image filesystem
COPY package.json .
# npm install
RUN yarn install
# copy all files
COPY . .
# run build
RUN yarn build
# expose port
EXPOSE 80
# this runs the command to run the app
CMD ["npm", "run", "start"]