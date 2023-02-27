import React, { useState, useEffect } from "react";
import styles from "./dropdown.module.css";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";

const DropDown = ({ categories, category }) => {
	useEffect(() => {}, []);
	const router = useRouter();
	const iconFinder = {
		Housing: <i class="bi bi-briefcase"></i>,
		Travel: <i class="bi bi-briefcase"></i>,
		"Media Influencers": <i class="bi bi-camera2"></i>,
		Education: <i class="bi bi-briefcase"></i>,
		Dining: <i class="bi bi-briefcase"></i>,
		Business: <i class="bi bi-briefcase"></i>,
		Fitness: <i class="bi bi-briefcase"></i>,
	};

	const navigate = (type) => {
		console.log(type);
		router.push({
			pathname: "/business-listings",
			query: { type: type },
		});
	};

	return (
		<div className={`${styles.container}`}>
			<Grid container spacing={0}>
				{categories.map(({ id, val }) => (
					<Grid
						onClick={() => navigate(val)}
						key={id}
						item
						xs={6}
						className={styles.gridItem}
					>
						{val}
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default DropDown;
