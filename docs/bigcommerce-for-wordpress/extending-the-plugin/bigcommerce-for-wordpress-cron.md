<div><h3 class="sub-docs-type" id="bigcommerce-for-wordpress">BigCommerce for WordPress</h3></div>

# BigCommerce for WordPress Cron

This article provides a general description for WP-Cron and how to change its behavior in order to make it more reliable.

BigCommerce for WordPress plugin has update/sync logic which is based on cron jobs (WP-Cron). WP-Cron is built-in logic for processing postponed, background tasks. While that logic is great and flexible it also has some problems which may affect import product logic.

## Wp-Cron vs Server Cron
WordPress has its own cron system for scheduling tasks such as checking for updates, scheduling a post for publication, and deleting comments from the trash. All cron jobs are handled by WP-Cron.

Meanwhile the logic has the name WP-Cron, it is not a real server cron job. The difference is:
- Server cron runs automatically and is fired by server processes. There is no need for an external source for events firing
- WP-Cron runs only when someone is on the site

<p>Here's an example:</p>

You schedule a job to run once an hour with WP-cron and WordPress will set an execution time for that job. However, the job won't be performed until there's site-traffic or there is an external request to WordPress. 

Because of this, WP-Cron jobs may be postponed or not performed at all. On the other hand, if you've set a job via the usual server cron it will be performed even if there isn't site traffic or external requests.

## WP-Cron enhance with Server Cron
In order to make WP-Cron more reliable and not dependent on site-traffic, the following steps should be taken:

### Open and edit wp-config.php
1. Open the wp-config file using an FTP client like [FileZilla](https://filezilla-project.org/) or SSH client.
2. Add the following string to the file:<br><code>define('DISABLE_WP_CRON', true);</code>
3. This code disables the running cron events on your WordPress site and allows you to create a real cron job.

### Add new cron job to the server
The following are different methods that can be used for adding a new cron job to the server.

**Cron job manager**

There are plenty of job managers available for hosting providers like [HostGator](https://www.hostgator.com/) or [Cloudways](https://www.cloudways.com/en/).

>**Note:** We recommend that you contact the hosting’s tech support for proper setup. Each hosting provider has specific detailed knowledge bases that cover how to set up cron jobs.

The following example is for HostGator but it also can be used for any other hosting with CPanel: 
1. Login to CPanel.
2. Find the **Advanced** tab.
3. Click on the **Cron jobs** there.
4. Under the **Add new cron job** section set the required interval.
5. Set the job <code>wget -q -O - https://example.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1 </code>
6. Verify that you replaced example.com with your domain name.
7. Click **Add new cron job** to set the cron.

**SSH (advanced)**

The following is basic required knowledge on setting cron jobs via crontab and other terminal commands. Be sure that you have SSH access before following these steps.
1. Open the SSH terminal.
2. Type `crontab -e`. That will open the cron-job manager.
3. Add the following command: <code>*/5 * * * * wget -q -O - 'https://example.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1</code>
4. Save and exit from crontab.
5. That will add a real cron job that fires every five minutes.

> **Important note:** you need to change https://example.com in the provided example with your own site address. <p>For example, if your site has the address https://funnycats.com then the command should be: 
><code>*/5 * * * * wget -q -O - 'https://funnycats.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1</code></p>

