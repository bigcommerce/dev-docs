<div><h3 class="sub-docs-type" id="bigcommerce-for-wordpress">BigCommerce for WordPress</h3></div>

# BigCommerce for WordPress Cron

This document provides a general description for WP-Cron and how Server Cron can be used to improve WP-Cron's reliability.

BigCommerce for WordPress plugin has update/sync logic which is based on cron jobs (WP-Cron). WP-Cron is built-in logic for processing postponed and background tasks. While that logic is great and flexible it also has some problems which can affect import product logic.

## WP-Cron versus Server Cron
WordPress has its own cron system for scheduling tasks such as checking for updates, scheduling a post for publication, and deleting comments from the trash. All cron jobs are handled by WP-Cron.

Differences between server cron and WP-Cron include:
- Server cron runs automatically and is fired by server processes. There's no need for an external source for events firing.
- WP-Cron only runs when someone is on the site.

<p>Here's an example:</p>

You schedule a job to run once an hour with WP-cron and WordPress will set an execution time for that job. Yet, the job won't be performed until there's site-traffic or there's an external request to WordPress. 

Because of this, WP-Cron jobs can be postponed or not performed at all. So if you've set a job with the usual server cron it will be performed even if there isn't site traffic or external requests.

## Using Server Cron to enhance WP-Cron
To make WP-Cron more reliable and not dependent on site-traffic, take the following steps:

### Open and edit wp-config.php
1. Open the wp-config file using an FTP client like [FileZilla](https://filezilla-project.org/) or SSH client.
2. Add the following string to the file:<br><code>define('DISABLE_WP_CRON', true);</code>

    -   This code disables the running cron events on your WordPress site and lets you create a real cron job.


### Add new cron job to the server
You can use the following methods to add a new cron job to the server.

**Cron job manager**

There are plenty of job managers available for hosting providers like [HostGator](https://www.hostgator.com/) or [Cloudways](https://www.cloudways.com/).

>**Note:** We recommend that you contact the hosting’s tech support for proper setup. Each hosting provider has specific detailed knowledge bases that cover setting up cron jobs.

The following example is for HostGator, but it also can be used for any other hosting with cPanel: 
1. Sign in to cPanel.
2. Find the **Advanced** tab.
3. Click on the **Cron jobs**.
4. Set the required interval under the **Add new cron job** section.
5. Set the job <code>wget -q -O - https://example.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1 </code>.
6. Verify that you replaced example.com with your domain name.
7. Click **Add new cron job** to set the cron.

**SSH (advanced)**

The following is basic required knowledge on setting cron jobs with crontab and other terminal commands. Be sure that you have SSH access before following these steps.
1. Open the SSH terminal.
2. Type `crontab -e`. That will open the cron-job manager.
3. Add the following command: <code>*/5 * * * * wget -q -O - 'https://example.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1</code>
4. Save and exit from crontab.

That will add a real cron job that fires every five minutes.

> **Important note:** you need to change https://example.com in the provided example with your own site address. 
> 
>For example, if your site has the address https://funnycats.com then the command will be:
><code>*/5 * * * * wget -q -O - 'https://funnycats.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1</code>

