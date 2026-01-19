resource "google_cloud_run_service" "angular" {
  name     = var.service_name
  location = var.region

  template {
    spec {
      service_account_name = data.google_service_account.cloudrun.email
      containers {
        image = var.image_url
        ports {
          container_port = 8080
        }
        env {
          name  = "NODE_ENV"
          value = "production"
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

data "google_service_account" "cloudrun" {
  account_id = "ngx-housing-price-lab-run"
}

resource "google_cloud_run_service_iam_member" "public" {
  service  = google_cloud_run_service.angular.name
  location = var.region
  role     = "roles/run.invoker"
  member   = "allUsers"
}
