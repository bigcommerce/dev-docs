<div><h3 class="sub-docs-type" id="bigcommerce-for-wordpress">BigCommerce for WordPress</h3></div>

# BigCommerce for WordPress Cron

This document provides a general description for WP-Cron and how Server Cron can be used to improve WP-Cron's reliability.

BigCommerce for WordPress plugin has update/sync logic which is based on cron jobs (WP-Cron). WP-Cron is built-in logic for processing postponed and background tasks. While that logic is great and flexible, it also has some problems which can affect product import logic.

## WP-Cron versus Server Cron
WordPress has its own cron system for scheduling tasks such as checking for updates, scheduling a post for publication, and deleting comments from the trash. All cron jobs are handled by WP-Cron.

Differences between server cron and WP-Cron include:
- Server cron runs automatically and is fired by server processes. There's no need for an external source for events firing.
- WP-Cron only runs when someone is on the site.

When you schedule a job to run once an hour with WP-cron, WordPress will set an execution time for that job. However, the job won't be performed until there's site traffic or there's an external request to WordPress. 

Because of this, WP-Cron jobs can be postponed or not performed at all, whereas a job you schedule with server cron will be performed even if there isn't site traffic or external requests.

## Using Server Cron to enhance WP-Cron
To make WP-Cron more reliable and not dependent on site traffic, take the following steps:

### Open and edit wp-config.php
To use server cron jobs, you need to disable WP-Cron events. This will suspend currently scheduled WP-Cron jobs as well. Use the following steps to disable WP-Cron jobs: 

1. Open the wp-config file using an FTP client like [FileZilla](https://filezilla-project.org/) or SSH client.
2. Add the following string to the file:

```php
define('DISABLE_WP_CRON', true);
```

### Add new cron job to the server
You can use the following methods to add a new cron job to the server.

#### Cron job manager

There are plenty of job managers available for hosting providers like [HostGator](https://www.hostgator.com/) or [Cloudways](https://www.cloudways.com/).

<!-- theme: info -->
> #### Note
> We recommend that you contact the hosting’s tech support for proper setup. Each hosting provider has specific detailed knowledge bases that cover setting up cron jobs.

The following example is for HostGator, but you can also use it for any other host that uses cPanel: 
1. Sign in to cPanel.
2. Find the **Advanced** tab.
3. Click on **Cron jobs**.
4. Set the required interval under the **Add new cron job** section.
5. Set the following job, replacing `example.com` with your domain name: 

```shell title="Create a cPanel cron job"
wget -q -O - https://example.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1
```

6. Click **Add new cron job** to save the job.

<!-- theme: info -->
> #### Important note
> Regardless of the method you use to create a cron job, you need to replace https://example.com in the provided examples with your own site address. 

#### SSH (advanced)

The following is the basic set of commands required to set cron jobs with crontab and other command-line tools. Be sure that you have SSH access configured before following these steps to add a server cron job that fires every five minutes.

1. Open the SSH-enabled terminal.
2. Type `crontab -e` to open the cron-job manager.
3. Add the following command, replacing `example.com` with your domain name: 

```shell title="Create cron job with SSH"
*/5 * * * * wget -q -O - 'https://example.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1
```
4. Save and exit from crontab.



