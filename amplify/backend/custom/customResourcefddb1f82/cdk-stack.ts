import * as cdk from 'aws-cdk-lib';
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class cdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps, amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });

    // Add custom S3 bucket - will be created by Amplify Console
    new s3.Bucket(this, 'CustomGen1BucketConsole', {
      bucketName: `amplify-gen1-console-${cdk.Stack.of(this).account}`,
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}