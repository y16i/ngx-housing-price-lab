output "service_url" {
  description = "URL of the Cloud Run service"
  value       = google_cloud_run_service.angular.status[0].url
}

output "service_name" {
  description = "Name of the Cloud Run service"
  value       = google_cloud_run_service.angular.name
}

output "service_location" {
  description = "Location of the Cloud Run service"
  value       = google_cloud_run_service.angular.location
}
