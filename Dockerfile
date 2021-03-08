# pull official base image
FROM node:14.15

# set working directory container
WORKDIR /app 

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN yarn install --silent
RUN yarn global add react-scripts

# add app
COPY . ./

# start app
CMD ["yarn", "start"]