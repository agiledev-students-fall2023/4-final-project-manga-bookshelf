#!/bin/bash

# Navigate to front-end directory and start the front-end
(cd front-end && npm start) &

# Navigate to back-end directory and start the back-end
(cd back-end && npm run dev) &

# Wait for all background processes to finish
wait
