pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = 'galbayrak' // Değiştirin
        IMAGE_NAME = 'nodejs-app'
        REGISTRY_CRED = 'dockerhub-credentials-id' // Jenkins'te tanımlayacağınız ID
    }
    stages {
        stage('Docker Build') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_HUB_USER}/${IMAGE_NAME}:${BUILD_NUMBER}")
                }
            }
        }
        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', REGISTRY_CRED) {
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }
        stage('Deploy to K8s') {
            steps {
                sh "sed -i 's|\${DOCKER_HUB_USER}/nodejs-app:\${BUILD_NUMBER}|${DOCKER_HUB_USER}/${IMAGE_NAME}:${BUILD_NUMBER}|g' deployment.yaml"
                sh "kubectl apply -f deployment.yaml"
            }
        }
    }
}