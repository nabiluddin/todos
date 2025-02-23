#!/usr/bin/env sh

set -ex

# Find the latest projectEnvVariables.js file where environment variables need to be replaced.
projectEnvVariables=$(ls -t /usr/share/nginx/html/assets/projectEnvVariables*.js | head -n1)

# Print the original file content (before replacement)
echo "🔍 Original Environment Variables in $projectEnvVariables:"
cat "$projectEnvVariables"

# Replace environment variables using envsubst and store in a temp file
envsubst < "$projectEnvVariables" > ./projectEnvVariables_temp

# Print the new file content (after replacement)
echo "✅ Updated Environment Variables in $projectEnvVariables:"
cat ./projectEnvVariables_temp

# Overwrite the original file with updated values
cp ./projectEnvVariables_temp "$projectEnvVariables"
rm ./projectEnvVariables_temp
