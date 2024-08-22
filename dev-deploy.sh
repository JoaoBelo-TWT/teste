#!/bin/bash
set -e

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 332112688037.dkr.ecr.us-east-1.amazonaws.com

docker build -t source-ui:develop .

docker tag source-ui:develop 332112688037.dkr.ecr.us-east-1.amazonaws.com/source-ui:develop

docker push 332112688037.dkr.ecr.us-east-1.amazonaws.com/source-ui:develop

aws ecs update-service --region us-east-1  --cluster source-ui-develop --service source-ui-develop --task-definition source-ui-develop --force-new-deployment
