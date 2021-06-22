# Importing and Syncing

<div class="otp" id="no-index">
	
### On this page
- [CLI setup instructions](#cli-setup-instructions)
- [Set up and recommendations for cron](#set-up-and-recommendations-for-cron)

</div>

## CLI setup instructions

The import process will run faster and more reliably if run from the command line.

1. Ensure that your host has [WP-CLI](https://wp-cli.org/) installed and configured to manage your WordPress site.

2. The initial import will likely take longer than subsequent imports. Run the following command for the first import: 
`wp bigcommerce import products`

3. Set up a system cron job to run the import at your desired frequency. For example, to run every 10 minutes:
`*/10 * * * * /usr/bin/wp bigcommerce import products --quiet > /dev/null 2>&1`

This does not disable the WordPress cron-based import process. As long as the CLI import runs more frequently than the import configured on the settings screen, the cron-based import should never be triggered. In the event that both are running concurrently, safeguards are in place to ensure that only one process runs at a time.

![Product Sync](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/cli-setup-instructions.png)

Subsequent imports will only update products that have changed since the last import. To force an update on all products, add the `--force` flag to the import command:

`wp bigcommerce import products --force`

## Set up and recommendations for cron

WordPress sites will generally operate more efficiently if WordPress's default cron is disabled and replaced with a server-side cron job.

To disable WordPress's default cron, follow these steps:

1. Set a constant in `your wp-config.php`:
`define( 'DISABLE_WP_CRON', true );`

2. Set up a system cron job to run WordPress's cron events from the command line:
`* * * * * /usr/bin/wp cron event run --due-now --quiet > /dev/null 2>&1`
Running the job every minute is generally recommended.