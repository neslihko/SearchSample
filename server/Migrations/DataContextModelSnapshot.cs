﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;
using WebApi.Helpers;

namespace WebApi.Migrations
{
	[DbContext(typeof(DataContext))]
	partial class DataContextModelSnapshot : ModelSnapshot
	{
		protected override void BuildModel(ModelBuilder modelBuilder)
		{
#pragma warning disable 612, 618
			modelBuilder
				.HasAnnotation("ProductVersion", "2.0.0-rtm-26452")
				.HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

			modelBuilder.Entity("WebApi.Entities.SearchLog", b =>
				{
					b.Property<int>("Id")
						.ValueGeneratedOnAdd();

					b.Property<int>("HitCount");

					b.Property<string>("Query");

					b.Property<DateTime>("SearchDate");

					b.Property<string>("URL");

					b.HasKey("Id");

					b.ToTable("SearchLogs");
				});

			modelBuilder.Entity("WebApi.Entities.User", b =>
				{
					b.Property<int>("Id")
						.ValueGeneratedOnAdd();

					b.Property<string>("FirstName");

					b.Property<string>("LastName");

					b.Property<byte[]>("PasswordHash");

					b.Property<byte[]>("PasswordSalt");

					b.Property<string>("Username");

					b.HasKey("Id");

					b.ToTable("Users");
				});
#pragma warning restore 612, 618
		}
	}
}
