# Redis Notes

## Problems

- Had problem creating a redis server using docker on my local machine (Ubuntu 20.04), so this was the solution.
  - ```bash
    sudo docker run -it --rm --name redis --net redis -p 6379:6379 redis
    ```
  - ```bash
     ps aux | grep redis
    ```
  - ```bash
     sudo kill -9 1098
    ```
- Had a problem running redis after fresh install
  - ```bash
    sudo docker run -it --rm --name redis --net redis -p 6379:6379 redis
    ```
  - ```bash
    sudo service docker stop
    sudo rm /var/lib/docker/network/files/local-kv.db
    sudo service docker start
    ```
- Had a problem figuring out what was running on my local machines ports
  - ```bash
    sudo ss -tulw
    ```
  - Look for the port that's in use under `0.0.0.0:6379`
  - easiest way to figure out what PID it's under is by installing
  - ```bash
    sudo apt install net-tools
    ```
  - ```bash
    sudo netstat -ltnp
    ```
