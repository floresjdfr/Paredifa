FROM swipl

WORKDIR /app/
COPY . .

ARG UID=1000
ARG GID=1000
 
# The user that will run the app 
ARG USER=docker
ARG PW=docker
 
# Add the user that will run the app
RUN useradd -m ${USER} --uid=${UID} && echo 

CMD ["swipl","start.pl"]