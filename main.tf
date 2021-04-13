terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.36"
    }
  }
}

provider "aws" {
  region = "us-west-1"
}

resource "aws_db_instance" "rds-db" {
  identifier          = "todobackendstaging"
  allocated_storage   = "20"
  engine              = "postgres"
  engine_version      = "12.5"
  instance_class      = "db.t2.micro"
  name                = "todo"
  username            = "postgres"
  password            = "postgres"
  publicly_accessible = true
  # vpc_security_group_ids = ["rds_security_group_id"]
  skip_final_snapshot = true
}

resource "aws_elastic_beanstalk_application" "todo-backend-terraform" {
  name        = "ToDoBackendTerraform"
  description = "To-do backend Terraform app"
}

resource "aws_elastic_beanstalk_environment" "todo-backend-terraform-staging" {
  depends_on          = [aws_db_instance.rds-db]
  name                = "ToDoBackendTerraformStaging"
  application         = aws_elastic_beanstalk_application.todo-backend-terraform.name
  solution_stack_name = "64bit Amazon Linux 2 v3.1.7 running Corretto 11"

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-ec2-role"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "spring_profiles_active"
    value     = "aws"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "RDS_HOSTNAME"
    value     = aws_db_instance.rds-db.address
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "RDS_PORT"
    value     = aws_db_instance.rds-db.port
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "RDS_DB_NAME"
    value     = aws_db_instance.rds-db.name
  }
}

