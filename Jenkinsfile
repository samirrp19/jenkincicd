pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  environment {
    DOCKERHUB_USER = "samirrp19"
    APP_NAME       = "lt-codex"

    IMAGE_TAG      = "${env.BUILD_NUMBER}"
    IMAGE          = "${DOCKERHUB_USER}/${APP_NAME}:${IMAGE_TAG}"
    IMAGE_LATEST   = "${DOCKERHUB_USER}/${APP_NAME}:latest"

    // For smoke test only (local docker run)
    // If your API runs on same Jenkins host on port 3000 use host.docker.internal (works on Docker Desktop)
    // On Linux Jenkins, host.docker.internal may not work; you can override in Jenkins env/job.
    SMOKE_API_UPSTREAM = "http://host.docker.internal:3000"
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Docker Build') {
      steps {
        sh '''
          set -e
          docker version
          docker build --no-cache -t "$IMAGE" -t "$IMAGE_LATEST" .
          docker images | head -n 30
        '''
      }
    }

    stage('Smoke Test (optional)') {
      steps {
        sh '''
          set -e

          echo "Running smoke test with API_UPSTREAM=$SMOKE_API_UPSTREAM"
          CID=$(docker run -d -p 8088:80 -e API_UPSTREAM="$SMOKE_API_UPSTREAM" "$IMAGE_LATEST")
          echo "Container: $CID"

          sleep 4
          docker ps --filter "id=$CID"

          echo "---- curl / ----"
          curl -I http://localhost:8088 || true

          echo "---- logs ----"
          docker logs --tail=120 "$CID" || true

          docker rm -f "$CID" || true
        '''
      }
    }

    stage('DockerHub Login (Token)') {
      steps {
        withCredentials([string(credentialsId: 'dockerhub-creds', variable: 'DH_TOKEN')]) {
          sh '''
            set -e
            echo "$DH_TOKEN" | docker login -u "$DOCKERHUB_USER" --password-stdin
          '''
        }
      }
    }

    stage('Push to DockerHub') {
      steps {
        sh '''
          set -e
          docker push "$IMAGE"
          docker push "$IMAGE_LATEST"
        '''
      }
    }
  }

  post {
    always {
      sh 'docker logout || true'
      cleanWs()
    }
  }
}
