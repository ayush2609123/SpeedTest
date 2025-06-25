#!/usr/bin/env python3
import speedtest, json

# Run a quick download-only test
s = speedtest.Speedtest()
s.get_best_server()
dl = s.download()             # bits/sec
mbps = dl / 1e6               # to Mbps

print(json.dumps({"mbps": mbps}))
