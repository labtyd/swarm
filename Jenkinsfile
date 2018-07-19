pipeline {
    agent any
    
    stages {
      stage('Build') {
        steps {
          sh "docker service scale nodejs=0 || exit 0"
          sh "docker service rm nodejs || exit 0"
          sh '[[ $(docker ps -a -q) ]] && docker stop $(docker ps -a -q) || exit 0'
          sh '[[ $(docker ps -a -q) ]] && docker rm $(docker ps -a -q) || exit 0'
          sh '[[ $(docker ps -a -q) ]] && docker rmi $(docker images -q) --force || exit 0'
          sh "docker build -t artem:docker_swarm_test ."
          sh 'source /var/lib/jenkins/docker_cred ; docker login --username $DSW_LOGIN --password $DSW_PASS'
          sh "docker tag artem:docker_swarm_test apavlov123/docker_test"
          sh "docker push apavlov123/docker_test"
          sh "docker service create --with-registry-auth --name nodejs --publish 8001:8001 --mount type=bind,source=/etc/hostname,destination=/data/hostname,ro --replicas 5 apavlov123/docker_test"
          }
        }
      }
}
